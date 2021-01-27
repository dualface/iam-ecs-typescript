/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEvent } from "./ecs/ECSEvent";

/**
 * 攻击事件
 */
export class AttackEvent extends ECSEvent {
    /**
     * 事件的名字
     */
    static NAME = "AttackEvent";

    /**
     * 攻击目标的实体 ID
     */
    readonly targets: Array<string>;

    /**
     * 构造函数
     *
     * @param targets
     */
    constructor(targets: Array<string>) {
        super(AttackEvent.NAME);
        this.targets = targets;
    }
}
