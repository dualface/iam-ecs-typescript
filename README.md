# ecs-typescript

```
COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
```

使用 TypeScript 实现的一个 ECS 系统。

目前用于 Cocos Creator，不过因为没有依赖任何 Cocos Creator 的接口，所以也可以用在任何其他 JS 项目中。

在线 DEMO 展示: [https://liaoyulei.cn/projects/ecs-typescript/demo/](https://liaoyulei.cn/projects/ecs-typescript/demo/)

DEMO 源代码: [https://github.com/dualface/ecs-typescript/tree/main/demo/assets/scripts](https://github.com/dualface/ecs-typescript/tree/main/demo/assets/scripts)

~

## 目标

`ECS` 是 `Entity-Component-System` 的缩写，代表了一种架构模式。

`ECS` `并没有什么标准的实现，不过总的来讲，ECS` 具有这些特点：

-   `Entity` 代表一个实体，例如游戏中的 NPC、子弹、物品等等。通常每一个 `Entity` 都有一个唯一 ID。
-   `Component` 代表构成一个实体的其中一部分，称为组件。例如 NPC 可能由 `Movable`（可以移动）、`Health`（具有健康度，也就是血量）、`RenderNode`（渲染节点）几个组件组成，每个组件只定义特定的一组属性或者状态。
-   `System` 代表处理某一个领域逻辑的系统。大部分系统都是处理特定的 `Component`，例如专门处理所有 `Movable` 组件的系统仅仅处理移动等操作。这样一来大部分 system 通常都只包含相对简单的逻辑。

不过 `ECS` 也并非万能钥匙。在 UI `交互等场景中，ECS` 用起来就比较繁琐了。所以从实践的角度，我主要将 `ECS` 用于构建游戏世界的玩法实现。而涉及到 UI 交互等场景，仍然采用传统的面向对象架构。

在 `ecs-typescript` 这个实现中，我主要追求以下目标：

-   容易理解的设计
-   简单明了的 API
-   无性能损耗

~

## DEMO

示例中，实现了如下的游戏玩法：

-   屏幕中会随机产生 NPC，这些 NPC 会随机移动
-   玩家点击屏幕中的 NPC，会对 NPC 造成伤害
-   NPC 的 HP 降低为 0 时，从屏幕中移除 NPC

~

整个游戏包含下列部分：

-   组件：
    -   `NPCComponent`: 标记实体为 NPC 的组件，仅仅用于统计当前 NPC 数量。
    -   `RenderNodeComponent`: 渲染节点组件用于引用在屏幕上的一个 `cc.Node`。
    -   `HealthComponent`: 健康组件用于保存 NPC 的当前 HP。
    -   `MovableComponent`: 可移动组件用于保存 NPC 的当前位置、移动方向、速度等状态。
-   事件：
    -   `AttackEvent`: 对一组目标发起攻击。
-   系统：
    -   `MovableSystem`: 处理所有目标的移动。
    -   `InputSystem`: 处理用户的点击事件，如果点击到了 NPC，则创建 `AttackEvent` 事件。
    -   `AttackSystem`: 处理 `AttackEvent` 事件，并从屏幕上移除已经被消灭的目标。

所有源代码在 `demo` 目录中，使用 Cocos Creator 2.4 最新版打开即可。

~

在 DEMO 中，`InputSystem` 系统会注册触摸操作事件，然后在触摸发生时，判断触摸位置是否有 NPC。如果有 NPC，则创建一个 `AttackEvent` 事件，并将这些 NPC 添加到事件中。

`AttackSystem` 读取到 `AttackEvent` 事件后，就会判断目标是否具备健康度组件，并扣除健康度。当目标的健康度归零时，就会移除目标。

这种将游戏逻辑拆分为多个 system，并用事件进行交互的架构，带来了以下好处：

-   每一个 system 只处理自己关心的组件和实体，所以每一个 system 的逻辑都能尽量保持最简单的实现。

-   system 之间通过事件来传递信息，例如 `InputSystem` 将攻击目标通过 `AttackEvent` 事件传递出去，而 `AttackSystem` 则通过读取 `AttackEvent` 事件来实现攻击的逻辑。这样随着游戏玩法的扩展，即便添加了其他来源的攻击事件，`AttackSystem` 也不需要进行修改。从而解除了 system 之间的耦合。

-   此外，事件还可以被多个 system 读取，而这些 system 并不需要进行事件注册等操作。

~

## ECS API 说明

所有 API 都在 `lib/ecs/` 目录中，并且有中文注释，文档此处省略。。。

\-EOF\-
