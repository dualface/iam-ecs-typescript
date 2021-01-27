/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { AttackEvent } from "./AttackEvent";
import { ECSSystem } from "./ecs/ECSSystem";
import { HealthComponent } from "./HealthComponent";
import { RenderNodeComponent } from "./RenderNodeComponent";

/**
 * 处理攻击事件的系统
 */
export class AttackSystem extends ECSSystem {
    /**
     * 系统的名字
     */
    static NAME = "AttackSystem";

    /**
     * 构造函数
     */
    constructor() {
        super(AttackSystem.NAME);
    }

    /**
     * 处理事件
     *
     * @param dt
     */
    update(dt: number): void {
        const attackEvents = this.ecs.events.fetch<AttackEvent>(
            AttackEvent.NAME
        );
        attackEvents.forEach((event) => {
            event.targets.forEach((entityID) => this.attackTarget(entityID));
        });
    }

    //// private

    /**
     * 攻击目标
     *
     * @param entityID
     */
    private attackTarget(entityID: string): void {
        // 如果目标实体不包含健康度组件，则不做处理
        const entity = this.ecs.entities.get(entityID);
        if (!entity.hasComponent(HealthComponent.NAME)) return;

        const health = entity.getComponent<HealthComponent>(
            HealthComponent.NAME
        );
        // 每次扣除最大健康度的 30%
        health.hp -= health.maxHP * 0.3;
        if (health.hp <= 0) {
            // 如果健康度归零，则移除实体
            if (entity.hasComponent(RenderNodeComponent.NAME)) {
                // 移除实体前，需要移除对应的渲染节点
                const render = entity.getComponent<RenderNodeComponent>(
                    RenderNodeComponent.NAME
                );
                render.setRemoved();
            }
            this.ecs.entities.remove(entity);
        }
    }
}
