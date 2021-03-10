/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "./ECSComponent";
import { Constructor } from "./__private";

/**
 * 组件集合
 */
export interface ECSComponents {
    /**
     * 返回组件总数
     */
    size(): number;

    /**
     * 查询特定名字的所有组件
     *
     * @param constructor
     */
    all<T extends ECSComponent>(constructor: Constructor<T>): T[];

    /**
     * 查询特定名字的第一个组件
     *
     * @param constructor
     */
    get<T extends ECSComponent>(constructor: Constructor<T>): T;

    /**
     * 添加组件
     *
     * @param component
     */
    add(component: ECSComponent): void;

    /**
     * 移除组件
     *
     * @param component
     */
    delete(component: ECSComponent): void;
}
