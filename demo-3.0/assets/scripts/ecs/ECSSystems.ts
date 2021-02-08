/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSSystem } from "./ECSSystem";

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
    delete(system: ECSSystem): ECSSystems;

    /**
     * 移除所有系统
     */
    clear(): ECSSystems;

    /**
     * 按照优先级对所有系统排序，数值小的优先执行
     */
    sort(): ECSSystems;
}
