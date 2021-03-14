# ecs-typescript

使用 TypeScript 实现的一个 ECS 系统。

目前用于 Cocos Creator，不过因为没有依赖任何 Cocos Creator 的接口，所以也可以用在任何其他 JS 项目中。

在线 DEMO 展示: [https://liaoyulei.cn/projects/ecs-typescript/demo/](https://liaoyulei.cn/projects/ecs-typescript/demo/)

适用于 Cocos Creator 3.0 的 DEMO 源代码: [https://github.com/dualface/ecs-typescript-demo](https://github.com/dualface/ecs-typescript-demo)


QQ 群： 367237484

```
COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
```

~


## CHANGELOG

-   2021/03/14: 增加 `ECSComponentInterface` 接口
-   2021/03/10: 将 DEMO 迁移到单独的仓库
-   2021/03/10: 发布为 NPM 包，使用 `ecsclass` 装饰器简化代码
-   2021/02/08: 添加 Cocos Creator 3.0 示例项目
-   2021/01/26: 初始发布

~


## 目标

`ECS` 是 `Entity-Component-System` 的缩写，代表了一种架构模式。

`ECS` 并没有什么标准的实现。不过总的来讲，`ECS` 具有这些特点：

-   `Entity` 代表一个实体，例如游戏中的 NPC、子弹、物品等等。通常每一个 `Entity` 都有一个唯一 ID。
-   `Component` 代表构成一个实体的其中一部分，称为组件。例如 NPC 可能由 `Movable`（可以移动）、`Health`（具有健康度，也就是血量）、`RenderNode`（渲染节点）几个组件组成，每个组件只定义特定的一组属性或者状态。
-   `System` 代表处理某一个领域逻辑的系统。大部分系统都是处理特定的 `Component`，例如专门处理所有 `Movable` 组件的系统仅仅处理移动等操作。这样一来大部分 system 通常都只包含相对简单的逻辑。

不过 `ECS` 也并非万能钥匙。在 UI 交互等场景中，`ECS` 用起来就比较繁琐了。所以从实践的角度，我主要将 `ECS` 用于构建游戏世界的玩法实现。而涉及到 UI 交互等场景，仍然采用传统的面向对象架构。

在 `ecs-typescript` 这个实现中，我主要追求以下目标：

-   容易理解的设计
-   简单明了的 API
-   无性能损耗

~


## DEMO

适用于 Cocos Creator 3.0 的 DEMO 源代码: [https://github.com/dualface/ecs-typescript-demo](https://github.com/dualface/ecs-typescript-demo)

~


## ECS API 说明

所有 API 都在 `lib/ecs/` 目录中，并且有中文注释，文档此处省略。。。

\-EOF\-
