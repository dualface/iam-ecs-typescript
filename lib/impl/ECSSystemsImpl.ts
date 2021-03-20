/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { IECSSystem } from "../ECSSystem";
import { IECSSystems } from "../ECSSystems";
import { Constructor } from "../__private";
import { ECSImpl } from "./ECSImpl";

/**
 * ECS 系统集合的实现
 */
export class ECSSystemsImpl implements IECSSystems {
    /**
     * 所有已经载入完成的系统，按照优先级排序
     */
    private readonly loaded = new Array<IECSSystem>();

    /**
     * 按照名字查找所有已经载入完成的系统
     */
    private readonly loadedByName = new Map<string, IECSSystem>();

    /**
     * 保存正在载入中的系统，当 ECSSystem.load() 方法完成后移动到 loaded 队列
     */
    private readonly loading = new Map<string, [IECSSystem, boolean]>();

    /**
     * 系统的运行状态
     */
    private readonly systemsRunning = new Map<string, boolean>();

    /**
     * 所属 ECS
     */
    private readonly ecs: ECSImpl;

    /**
     * 当前运行状态
     */
    private running: boolean = false;

    /**
     * 目前最大优先级，后添加的系统会自动使用更大的优先级数值
     */
    private maxPriority: number = 0;

    constructor(ecs: ECSImpl) {
        this.ecs = ecs;
    }

    start(): void {
        if (this.running) {
            throw new RangeError("[ECS] already is running");
        }
        this.running = true;
        this.checkLoading();
    }

    stop(): void {
        if (!this.running) {
            throw new RangeError("[ECS] not running");
        }

        // 停止所有正在运行的系统
        this.loadedByName.forEach((system, name) => {
            if (this.systemsRunning.get(name) === true) {
                system.stop();
            }
            this.systemsRunning.set(name, false);
        });

        this.running = false;
    }

    update(dt: number): void {
        for (const system of this.loaded) {
            if (system.enabled) {
                system.update(dt);
            }
        }
    }

    get<T extends IECSSystem>(constructor: Constructor<T>): T {
        const name = constructor.name;
        const system = this.loadedByName.get(name);
        if (!system) {
            throw new RangeError(`[ECS] not found system '${name}'`);
        }
        return system as T;
    }

    add(system: IECSSystem, priority?: number): IECSSystems {
        const name = system.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] system '${system}' not set name by @ecsclass`
            );
        }
        if (this.loadedByName.has(name)) {
            throw new RangeError(`[ECS] system '${name}' already exists`);
        }
        if (this.loading.has(name)) {
            throw new RangeError(`[ECS] system '${name}' already in loading`);
        }

        // 设置系统运行初始状态
        system.setECSEnvironment(this.ecs);
        if (typeof priority === "number") {
            system.priority = priority;
            if (priority > this.maxPriority) {
                this.maxPriority = priority + 1;
            }
        } else {
            system.priority = this.maxPriority;
            this.maxPriority++;
        }
        this.systemsRunning.set(system.name, false);

        // 加入 loading 列表
        this.loading.set(name, [system, false]);
        system
            .load()
            .then(() => {
                // 更新 loading 列表状态
                this.loading.set(name, [system, true]);
                // 检查 loading 列表
                this.checkLoading();
            })
            .catch((e) => {
                throw e;
            });

        return this;
    }

    delete(system: IECSSystem): IECSSystems {
        const name = system.name;
        if (this.loadedByName.has(name)) {
            // 从载入完成的列表中删除指定 system
            for (let i = 0, l = this.loaded.length; i < l; i++) {
                if (this.loaded[i].name === name) {
                    this.loaded.splice(i, 1);
                    break;
                }
            }
            this.loadedByName.delete(name);
        } else if (this.loading.has(name)) {
            // 从正在载入的列表中删除指定 system
            this.loading.delete(name);
        } else {
            throw new RangeError(`[ECS] not found system '${name}`);
        }

        // 检查是否需要停止系统
        if (this.systemsRunning.get(name)) {
            system.stop();
        }
        this.systemsRunning.delete(name);

        // 卸载系统
        system.unload();
        system.setECSEnvironment(undefined);

        // 检查载入中的系统
        this.checkLoading();

        return this;
    }

    clear(): IECSSystems {
        this.loadedByName.forEach((system) => this.delete(system));
        this.loading.forEach((pair) => this.delete(pair[0]));
        return this;
    }

    sort(): IECSSystems {
        this.loaded.sort((a: IECSSystem, b: IECSSystem): number => {
            if (a.priority > b.priority) {
                return 1;
            } else if (a.priority < b.priority) {
                return -1;
            } else {
                return 0;
            }
        });

        return this;
    }

    //// private

    /**
     * 检查 loading 列表中的所有系统是否都已经载入完成
     */
    private checkLoading(): void {
        // 已经载入完成的系统移动到 loaded 列表
        // 未载入完成的保持在 loading 列表中
        this.loading.forEach((pair, name) => {
            if (!pair[1]) return;

            const system = pair[0];
            this.loaded.push(system);
            this.loadedByName.set(name, system);
            this.loading.delete(name);
        });

        // 重新排序
        this.sort();

        if (this.loading.size > 0) {
            // 如果还有系统未加载完成，则继续等待
            return;
        }

        if (!this.running) return;

        // 启动所有还未启动的系统
        for (const system of this.loaded) {
            if (this.systemsRunning.get(system.name) === true) continue;

            system.start();
            this.systemsRunning.set(system.name, true);
        }
    }
}
