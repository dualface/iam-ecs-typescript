/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { Node } from "cc";
import { ecsclass, ECSComponent } from "ecs-typescript";

/**
 * 渲染节点组件
 */
@ecsclass("RenderNodeComponent")
export class RenderNodeComponent extends ECSComponent {
    /**
     * 是否已经移除
     */
    private removed: boolean = false;

    /**
     * 构造函数
     *
     * @param node 节点
     */
    constructor(readonly node: Node) {
        super();
    }

    /**
     * 设置为已经移除（同时删除渲染节点）
     */
    setRemoved(): void {
        if (this.removed) return;
        this.removed = true;
        this.node.removeFromParent();
    }
}
