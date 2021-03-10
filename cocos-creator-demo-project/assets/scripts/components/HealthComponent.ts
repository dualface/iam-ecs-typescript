/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ecsclass, ECSComponent } from "ecs-typescript";

/**
 * 健康度组件
 */
@ecsclass("HealthComponent")
export class HealthComponent extends ECSComponent {
    /**
     * 最大健康度
     */
    readonly maxHP: number;

    /**
     * 剩余健康度
     */
    hp = 0;

    /**
     * 构造函数
     *
     * @param hp
     */
    constructor(hp: number) {
        super();
        this.maxHP = this.hp = hp;
    }
}
