/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "./ECSComponent";
import { ECSComponents } from "./ECSComponents";

/**
 * 用于生成实体唯一 ID
 */
let newEntityID: number = 0;

/**
 * 实体基础类
 */
export class ECSEntity {
    /**
     * 实体 ID
     */
    readonly id: string;

    /**
     * 实体的所有组件
     */
    readonly components = new Map<string, ECSComponent>();

    /**
     * 全局组件集合，由 ECS 指定，让 Entity 可以直接将组件添加到 ECS 中
     */
    __globalComponents: ECSComponents | undefined = undefined;

    /**
     * 返回实体可用状态
     */
    isEnabled(): boolean {
        return this._enabled;
    }

    /**
     * 设置实体的所有组件是否可用
     *
     * @param enabled
     */
    setEnabled(enabled: boolean) {
        if (this._enabled === enabled || !this.__globalComponents) {
            // 状态未改变，或者还未添加到 ECS 中的实体，设置 enabled 不起作用
            return;
        }

        this._enabled = enabled;
        if (enabled) {
            // 把组件添加到全局组件列表
            this.components.forEach((component) => {
                this.__globalComponents?.add(component);
            });
        } else {
            // 从全局组件列表移除组件
            this.components.forEach((component) => {
                this.__globalComponents?.delete(component);
            });
        }
    }

    /**
     * 构造函数
     */
    constructor() {
        newEntityID++;
        this.id = newEntityID.toString();
    }

    /**
     * 添加组件到实体
     *
     * @param component
     */
    addComponent(component: ECSComponent): ECSEntity {
        if (this.components.has(component.name)) {
            throw new RangeError(
                `ECSEntity.addComponent(): component '${component.name}' already exists`
            );
        }
        component.entityID = this.id;
        if (this.__globalComponents) {
            this.__globalComponents.add(component);
        }
        this.components.set(component.name, component);
        return this;
    }

    /**
     * 检查指定的组件是否存在
     *
     * @param name
     */
    hasComponent(name: string): boolean {
        return this.components.has(name);
    }

    /**
     * 取得指定名字的组件
     *
     * @param name
     */
    getComponent<T extends ECSComponent>(name: string): T {
        const component = this.components.get(name);
        if (!component) {
            throw new RangeError(
                `ECSEntity.getComponent(): component '${name}' not found`
            );
        }
        return component as T;
    }

    /**
     * 移除组件
     *
     * @param name
     */
    removeComponent(name: string): ECSEntity {
        if (!this.components.has(name)) {
            throw new RangeError(
                `ECSEntity.removeComponent(): component '${name}' not found`
            );
        }
        const component = this.components.get(name);
        if (component && this.__globalComponents) {
            this.__globalComponents.delete(component);
        }
        this.components.delete(name);
        return this;
    }

    /**
     * 移除所有组件
     */
    removeAllComponents(): ECSEntity {
        if (this.__globalComponents) {
            this.components.forEach((component) => {
                this.__globalComponents?.delete(component);
            });
        }
        this.components.clear();
        return this;
    }

    //// private

    /**
     * 实体当前是否可用
     */
    private _enabled: boolean = false;
}
