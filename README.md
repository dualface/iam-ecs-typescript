# ecs-typescript-liaoyulei

使用 TypeScript 实现的一个 ECS 系统。

目前用于 Cocos Creator，不过因为没有依赖任何 Cocos Creator 的接口，所以也可以用在任何其他 JS 项目中。

~

## 目标

ECS 是 Entity-Component-System 的缩写，代表了一种架构模式。

ECS 并没有什么标准的实现，不过总的来讲，ECS 具有这些特点：

-   Entity 代表一个实体，例如游戏中的 NPC、子弹、物品等等。通常每一个 Entity 都有一个唯一 ID。
-   Component 代表构成一个实体的其中一部分，称为组件。例如 NPC 可能由 Movable（可以移动）、Health（具有健康度，也就是血量）、RenderNode（渲染节点）几个组件组成，每个组件只定义特定的一组属性或者状态。
-   System 代表处理某一个领域逻辑的系统。大部分系统都是处理特定的 Component，例如专门处理所有 Movable 组件的系统仅仅处理移动等操作。这样一来大部分 System 通常都只包含相对简单的逻辑。

不过 ECS 也并非万能钥匙。在 UI 交互等场景中，ECS 用起来就比较繁琐了。所以从实践的角度，我主要将 ECS 用于构建游戏世界的玩法实现。而涉及到 UI 交互等场景，仍然采用传统的面向对象架构。

在 `ecs-typescript-liaoyulei` 这个实现中，我主要追求以下目标：

-   容易理解的设计
-   简单明了的 API
-   无性能损耗

~

## DEMO

在讨论 ECS 具体实现之前，先讲述一下 demo 目录中的示例。

示例中，实现了如下的游戏玩法：

-   屏幕中会随机产生 NPC，这些 NPC 会随机移动
-   玩家点击屏幕中的 NPC，会对 NPC 造成伤害
-   NPC 的 HP 降低为 0 时，会从屏幕中移除 NPC

~

拆解游戏玩法，需要为 NPC 准备这些组件：

-   RenderNode: 渲染节点组件用于引用在屏幕上的一个 cc.Node
-   Health: 健康组件用于保存 NPC 的当前 HP
-   Movable: 可移动组件用于保存 NPC 的当前位置、移动方向、速度等状态

~

### 定义 NPC 需要的组件

要定一个组件非常简单，`RenderNodeComponent` 组件代码如下：

```typescript
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
```

`ECSComponent` 是组件的基础类，所有自定义的组件都必须从这个类继承。并且基于规范，应该定义一个名为 `NAME` 的静态成员表示组件的名字，并在构造函数中将名字传入父类。

`RenderNodeComponent` 的构造函数要求传入一个 `cc.Node` 对象，这是 Cocos Creator 中的一个节点。所以这个组件的功能仅仅是保持一个针对 `cc.Node` 对象的引用。以及添加一个删除操作。

~

由于其他组件都非常简单，这里就不列出代码了，参阅源文件即可（`demo/assets` 目录中）。

~

### 创建 ECS 系统

在准备好组件后，就可以创建 ECS 系统并添加实体到 ECS 中了。

下面的代码放在场景的生命周期方法中（源文件 `demo/assets/GameScene.ts`）：

```typescript
onLoad() {
    // 创建 ECS
    this.ecs = newECS();

    // 创建一个 NPC 的渲染节点
    const npcNode = cc.instantiate("npc_prefab");
    npcNode.setParent(this.node);

    // 创建一个 NPC 实体，并添加需要的组件
    const npc = new ECSEntity();
    // 添加渲染节点组件，并指定 npcNode
    npc.addComponent(new RenderNodeComponent(npcNode));
    // 添加健康度组件，并指定初始 HP
    npc.addComponent(new HealthComponent(100));
    // 添加移动组件，并指定初始位置、移动方向和速度
    npc.addComponent(new MovableComponent(new cc.Vec2(0, 0), "down", 1));

    // 将实体添加到 ECS 中
    this.ecs.entities.add(npc);
}

start() {
    // 启动 ECS
    this.ecs.start();
}

stop() {
    // 停止 ECS
    this.ecs.stop();
}

update(dt: number) {
    // 持续更新 ECS 状态
    this.ecs.update(dt);
}
```

~

### 让 NPC 动起来

我们先添加第一个系统 `MovableSystem`，让 NPC 可以动起来：

```typescript
/**
 * 处理所有可以移动的组件
 */
export class MovableSystem extends ECSSystem {
    /**
     * 系统的名字
     */
    static NAME = "MovableSystem";

    /**
     * 构造函数
     */
    constructor() {
        super(MovableSystem.NAME);
    }

    /**
     * 更新可移动组件的位置
     *
     * @param dt
     */
    update(dt: number): void {
        // 从 ECS 取得所有 MovableComponent
        const movables = this.ecs.components.all<MovableComponent>(
            MovableComponent.NAME
        );

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

            // 如果该组件所属的实体拥有 RenderNodeComponent 组件
            // 则同步更新 cc.Node 的位置
            const entity = this.ecs.entities.get(movable.entityID);
            if (entity.hasComponent(RenderNodeComponent.NAME)) {
                const render = entity.getComponent(RenderNodeComponent.NAME);
                render.node.setPosition(movable.position);
            }
        });
    }
}
```

要让这个系统可以工作，必须将系统添加到 ECS 中。修改之前的代码：

```typescript
onLoad() {
    ....
    ....

    this.ecs.addSystem(new MovableSystem());
}
```

\-未完待续...\-
