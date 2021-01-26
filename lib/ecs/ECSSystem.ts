import { ECS } from "./ECS";

/**
 * ECSSystem 基础类
 */
export abstract class ECSSystem {
    /**
     * 系统的名字
     */
    get name(): string {
        if (typeof this._name !== "string" || this._name.length === 0) {
            throw new TypeError(
                `The class inherited ECSSystem not set name, ${this}`
            );
        }
        return this._name;
    }

    /**
     * 系统是否处于允许状态
     */
    enabled: boolean = true;

    /**
     * 执行时的优先级，数字更小的系统会更优先执行
     */
    priority: number = 0;

    /**
     * 构造函数，必须从继承类调用
     *
     * @param name
     */
    protected constructor(name: string) {
        this._name = name;
    }

    /**
     * 确保读取 ecs 属性时总是有效值
     */
    get ecs(): ECS {
        if (!this.__ecs) {
            throw new TypeError("ECSSystem.ecs is undefined");
        }
        return this.__ecs;
    }

    /**
     * 更新 ecs 属性值
     */
    set ecs(newECS: ECS) {
        this.__ecs = newECS;
    }

    /**
     * 系统载入
     */
    async load() {}

    /**
     * 系统卸载
     */
    unload(): void {}

    /**
     * 启动系统
     */
    start(): void {}

    /**
     * 停止系统
     */
    stop(): void {}

    /**
     * 更新状态
     *
     * @param dt
     */
    update(dt: number): void {}

    /**
     * 清理
     */
    cleanup(): void {
        this.__ecs = undefined;
    }

    //// private

    /**
     * 系统的名字
     */
    private _name: string;

    /**
     * 系统所属的 ECS，由 ECS 设置
     */
    private __ecs: ECS | undefined = undefined;
}

/**
 * 系统类型
 */
export type ECSSystemType<T extends ECSSystem> = { new (): T };

/**
 * 系统集合
 */
export interface ECSSystems {
    /**
     * 返回指定名字的系统
     *
     * @param name
     */
    get<T extends ECSSystem>(name: string): T;

    /**
     * 添加系统
     *
     * @param system
     * @param priority
     */
    add(system: ECSSystem, priority?: number): ECSSystems;

    /**
     * 移除系统
     *
     * @param system
     */
    remove(system: ECSSystem): ECSSystems;

    /**
     * 移除所有系统
     */
    removeAll(): ECSSystems;

    /**
     * 按照优先级对所有系统排序，数值小的优先执行
     */
    sort(): ECSSystems;
}
