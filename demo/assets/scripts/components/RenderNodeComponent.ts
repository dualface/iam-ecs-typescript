/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "../ecs/ecs";

/**
 * 渲染节点组件
 */
export class RenderNodeComponent extends ECSComponent {
    /**
     * 组件的名字
     */
    static NAME = "RenderNodeComponent";

    /**
     * 节点
     */
    readonly node: cc.Node;

    /**
     * 是否已经移除
     */
    private removed: boolean = false;

    /**
     * 构造函数
     *
     * @param node
     */
    constructor(node: cc.Node) {
        super(RenderNodeComponent.NAME);
        this.node = node;
    }

    /**
     * 设置为已经移除（同时删除渲染节点）
     */
    setRemoved(): void {
        if (this.removed) return;
        this.removed = true;
        this.node.removeFromParent(true);
    }
}
