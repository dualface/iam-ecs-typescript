/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEvent } from "./ECSEvent";

/**
 * 事件队列
 */
export interface ECSEvents {
    /**
     * 追加事件到队列
     *
     * @param event
     */
    push(event: ECSEvent): void;

    /**
     * 读取指定事件的列表
     *
     * @param name
     */
    fetch<T extends ECSEvent>(name: string): T[];

    /**
     * 检查是否存在指定事件
     *
     * @param name
     */
    has(name: string): boolean;

    /**
     * 清理所有事件
     */
    clear(): void;
}
