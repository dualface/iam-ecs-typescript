/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { EventTouch, Node, UITransform, Vec2, Vec3 } from "cc";
import { ecsclass, ECSSystem } from "ecs-typescript";
import { MovableComponent } from "../components/MovableComponent";
import { AttackEvent } from "../events/AttackEvent";

/**
 * 处理用户输入
 */
@ecsclass("InputSystem")
export class InputSystem extends ECSSystem {
    /**
     * 构造函数
     *
     * @param inputNode 用于注册事件的节点
     */
    constructor(readonly inputNode: Node) {
        super();
    }

    /**
     * 启动系统时注册事件
     */
    start(): void {
        this.inputNode.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    /**
     * 停止系统时注销事件
     */
    stop(): void {
        this.inputNode.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    //// private

    /**
     * 触摸事件处理函数
     *
     * @param event
     */
    private onTouchStart(event: EventTouch): void {
        // 将点击位置转换为屏幕坐标
        const transform = this.inputNode.getComponent(UITransform);
        if (!transform) return;

        const location = event.getUILocation();
        const position = transform.convertToNodeSpaceAR(
            new Vec3(location.x, location.y)
        );

        // 遍历所有 Movable 组件
        // 找出所有符合距离要求的实体，将其 ID 添加到数组中
        const targets = new Array<string>();
        const movables = this.ecs.components.all(MovableComponent);
        movables.forEach((movable) => {
            // 如果点击位置和目标距离小于一定值，视为点击到了目标
            if (Vec2.distance(position, movable.position) < 40) {
                targets.push(movable.entityID);
            }
        });

        // 如果找到符合距离要求的实体，则创建一个攻击事件
        if (targets.length > 0) {
            this.ecs.events.push(new AttackEvent(targets));
        }
    }
}
