/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { AttackSystem } from "./AttackSystem";
import { newECS } from "./ecs/ECS";
import { ECSEntity } from "./ecs/ECSEntity";
import { HealthComponent } from "./HealthComponent";
import { InputSystem } from "./InputSystem";
import { MovableComponent } from "./MovableComponent";
import { MovableSystem } from "./MovableSystem";
import { RenderNodeComponent } from "./RenderNodeComponent";

const { ccclass, property } = cc._decorator;

/**
 * 可以移动的方向
 */
const DIRECTIONS = ["up", "down", "left", "right"];

@ccclass
export default class GameScene extends cc.Component {
    @property({ displayName: "NPC 预制件", type: cc.Prefab })
    npcPrefab: cc.Prefab | undefined = undefined;

    /**
     * 创建下一个 NPC 之前的倒计时
     */
    private createCountdown = 0;

    /**
     * 创建 ECS
     */
    private ecs = newECS();

    onLoad() {
        if (!this.npcPrefab) {
            throw new TypeError("没有设置 NPC 预制件");
        }

        // 初始化场景时创建一个 NPC
        this.createNPC();

        // 将系统添加到 ECS 中
        this.ecs.systems.add(new MovableSystem());
        this.ecs.systems.add(new InputSystem(this.node));
        this.ecs.systems.add(new AttackSystem());
    }

    start() {
        this.ecs.start();
    }

    stop() {
        this.ecs.stop();
    }

    update(dt: number) {
        this.createCountdown -= dt;
        if (this.createCountdown <= 0) {
            // 确定下一次创建 NPC 的倒计时
            this.createCountdown = 0.5;

            // 创建一个 NPC
            this.createNPC();
        }

        // 持续更新 ECS 状态
        this.ecs.update(dt);
    }

    //// private

    private createNPC() {
        // 创建一个 NPC 的渲染节点
        const npcNode = cc.instantiate(this.npcPrefab);
        npcNode.setParent(this.node);

        // 创建一个 NPC 实体，并添加需要的组件
        const npc = new ECSEntity();
        // 添加渲染节点组件，并指定 npcNode
        npc.addComponent(new RenderNodeComponent(npcNode));
        // 添加健康度组件，并指定初始 HP
        npc.addComponent(new HealthComponent(100));
        // 添加移动组件，并指定初始位置、移动方向和速度
        const direction =
            DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const speed = Math.random() * 100 + 10;
        npc.addComponent(new MovableComponent(cc.Vec2.ZERO, direction, speed));

        // 将实体添加到 ECS 中
        this.ecs.entities.add(npc);
    }
}
