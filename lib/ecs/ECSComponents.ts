/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "./ECSComponent";

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
     * @param name
     */
    all<T extends ECSComponent>(name: string): T[];

    /**
     * 查询特定名字的第一个组件
     *
     * @param name
     */
    get<T extends ECSComponent>(name: string): T;

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

    /**
     * 移除特定名字的所有组件
     *
     * @param name
     */
    clear(name: string): void;
}
