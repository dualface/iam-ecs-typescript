/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { Rect, view } from "cc";
import { ecsclass, ECSSystem } from "ecs-typescript";
import { MovableComponent } from "../components/MovableComponent";
import { RenderNodeComponent } from "../components/RenderNodeComponent";

/**
 * 处理所有可以移动的组件
 */
@ecsclass("MovableSystem")
export class MovableSystem extends ECSSystem {
    readonly rect: Rect;

    /**
     * 构造函数
     */
    constructor() {
        super();

        const winSize = view.getVisibleSize();
        this.rect = new Rect(
            -winSize.width / 2 - 32,
            -winSize.height / 2 - 32,
            winSize.width + 64,
            winSize.height + 64
        );
    }

    /**
     * 更新可移动组件的位置
     *
     * @param dt
     */
    update(dt: number): void {
        // 从 ECS 取得所有 MovableComponent
        const movables = this.ecs.components.all(MovableComponent);

        // 遍历这些 MovableComponent，并更新状态
        movables.forEach((movable) => {
            // 更新位置
            switch (movable.direction) {
                case "up":
                    movable.position.y += movable.speed * dt;
                    break;
                case "down":
                    movable.position.y -= movable.speed * dt;
                    break;
                case "left":
                    movable.position.x -= movable.speed * dt;
                    break;
                case "right":
                    movable.position.x += movable.speed * dt;
                    break;
            }

            if (movable.position.x < this.rect.xMin) {
                movable.position.x = this.rect.xMax;
            } else if (movable.position.x > this.rect.xMax) {
                movable.position.x = this.rect.xMin;
            }

            if (movable.position.y > this.rect.yMax) {
                movable.position.y = this.rect.yMin;
            } else if (movable.position.y < this.rect.yMin) {
                movable.position.y = this.rect.yMax;
            }

            // 如果该组件所属的实体拥有 RenderNodeComponent 组件
            // 则同步更新 Node 的位置
            const entity = this.ecs.entities.get(movable.entityID);
            if (entity.hasComponent(RenderNodeComponent)) {
                const render = entity.getComponent(RenderNodeComponent);
                render.node.setPosition(movable.position);
            }
        });
    }
}
