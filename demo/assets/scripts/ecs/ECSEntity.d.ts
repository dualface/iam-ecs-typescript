/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSComponent } from "./ECSComponent";
import { ECSComponents } from "./ECSComponents";
/**
 * 实体基础类
 */
export declare class ECSEntity {
    /**
     * 实体 ID
     */
    readonly id: string;
    /**
     * 实体的所有组件
     */
    readonly components: Map<string, ECSComponent>;
    /**
     * 全局组件集合，由 ECS 指定，让 Entity 可以直接将组件添加到 ECS 中
     */
    __globalComponents: ECSComponents | undefined;
    /**
     * 返回实体可用状态
     */
    isEnabled(): boolean;
    /**
     * 设置实体的所有组件是否可用
     *
     * @param enabled
     */
    setEnabled(enabled: boolean): void;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 添加组件到实体
     *
     * @param component
     */
    addComponent(component: ECSComponent): ECSEntity;
    /**
     * 检查指定的组件是否存在
     *
     * @param name
     */
    hasComponent(name: string): boolean;
    /**
     * 取得指定名字的组件
     *
     * @param name
     */
    getComponent<T extends ECSComponent>(name: string): T;
    /**
     * 移除组件
     *
     * @param name
     */
    removeComponent(name: string): ECSEntity;
    /**
     * 移除所有组件
     */
    removeAllComponents(): ECSEntity;
    /**
     * 实体当前是否可用
     */
    private _enabled;
}
//# sourceMappingURL=ECSEntity.d.ts.map