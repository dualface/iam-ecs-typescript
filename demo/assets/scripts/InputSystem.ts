/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { AttackEvent } from "./AttackEvent";
import { ECSSystem } from "./ecs/ECSSystem";
import { MovableComponent } from "./MovableComponent";

/**
 * 处理用户输入
 */
export class InputSystem extends ECSSystem {
    /**
     * 系统的名字
     */
    static NAME = "InputSystem";

    /**
     * 用于注册事件的节点
     */
    readonly inputNode: cc.Node;

    /**
     * 构造函数
     *
     * @param inputNode
     */
    constructor(inputNode: cc.Node) {
        super(InputSystem.NAME);
        this.inputNode = inputNode;
    }

    /**
     * 启动系统时注册事件
     */
    start(): void {
        this.inputNode.on(
            cc.Node.EventType.TOUCH_START,
            this.onTouchStart,
            this
        );
    }

    /**
     * 停止系统时注销事件
     */
    stop(): void {
        this.inputNode.off(
            cc.Node.EventType.TOUCH_START,
            this.onTouchStart,
            this
        );
    }

    //// private

    /**
     * 触摸事件处理函数
     *
     * @param event
     */
    private onTouchStart(event: cc.Event.EventTouch): void {
        // 将点击位置转换为屏幕坐标
        const position = this.inputNode.convertToNodeSpaceAR(
            event.getLocation()
        );
        cc.log(`touch at: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}`);

        // 遍历所有 Movable 组件
        // 找出所有符合距离要求的实体，将其 ID 添加到数组中
        const targets = new Array<string>();
        const movables = this.ecs.components.all<MovableComponent>(
            MovableComponent.NAME
        );
        movables.forEach((movable) => {
            // 如果点击位置和目标距离小于一定值，视为点击到了目标
            if (cc.Vec2.distance(position, movable.position) < 40) {
                targets.push(movable.entityID);
            }
        });

        // 如果找到符合距离要求的实体，则创建一个攻击事件
        if (targets.length > 0) {
            this.ecs.events.push(new AttackEvent(targets));
        }
    }
}
