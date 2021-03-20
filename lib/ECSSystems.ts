/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { IECSSystem } from "./ECSSystem";
import { Constructor } from "./__private";

/**
 * 系统集合
 */
export interface IECSSystems {
    /**
     * 返回指定名字的系统
     *
     * @param constructor
     */
    get<T extends IECSSystem>(constructor: Constructor<T>): T;

    /**
     * 添加系统
     *
     * @param system
     * @param priority
     */
    add<T extends IECSSystem>(system: T, priority?: number): IECSSystems;

    /**
     * 移除系统
     *
     * @param system
     */
    delete<T extends IECSSystem>(system: T): IECSSystems;

    /**
     * 移除所有系统
     */
    clear(): IECSSystems;

    /**
     * 按照优先级对所有系统排序，数值小的优先执行
     */
    sort(): IECSSystems;
}
