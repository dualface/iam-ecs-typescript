/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { Vec3 } from "cc";
import { ECSComponent } from "../ecs/ecs";

/**
 * 可移动组件
 */
export class MovableComponent extends ECSComponent {
    /**
     * 组件的名字
     */
    static NAME = "MovableComponent";

    /**
     * 位置
     */
    position = new Vec3();

    /**
     * 移动方向
     */
    direction = "down";

    /**
     * 移动速度
     */
    speed = 0;

    /**
     * 构造函数
     *
     * @param position
     * @param direction
     * @param speed
     */
    constructor(position: Vec3, direction: string, speed: number) {
        super(MovableComponent.NAME);
        this.position = position.clone();
        this.direction = direction;
        this.speed = speed;
    }
}
