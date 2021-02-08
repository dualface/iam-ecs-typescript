/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "../ecs/ecs";

/**
 * 健康度组件
 */
export class HealthComponent extends ECSComponent {
    /**
     * 组件的名字
     */
    static NAME = "HealthComponent";

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
        super(HealthComponent.NAME);
        this.maxHP = this.hp = hp;
    }
}
