/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "./ecs/ECSComponent";

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
    position = cc.Vec2.ZERO;

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
    constructor(position: cc.Vec2, direction: string, speed: number) {
        super(MovableComponent.NAME);
        this.position = position.clone();
        this.direction = direction;
        this.speed = speed;
    }
}
