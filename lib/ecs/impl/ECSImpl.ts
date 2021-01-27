/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECS } from "../ECS";
import { ECSComponents } from "../ECSComponent";
import { ECSEntities } from "../ECSEntity";
import { ECSEvents } from "../ECSEvent";
import { ECSSystems } from "../ECSSystem";
import { ECSEntitiesImpl } from "./ECSEntitiesImpl";
import { ECSEventsImpl } from "./ECSEventsImpl";
import { ECSSystemsImpl } from "./ECSSystemsImpl";

/**
 * ECS 实现
 */
export class ECSImpl implements ECS {
    readonly events: ECSEvents;
    readonly systems: ECSSystems;
    readonly entities: ECSEntities;
    readonly components: ECSComponents;

    private readonly eventsImpl: ECSEventsImpl;
    private readonly systemsImpl: ECSSystemsImpl;
    private readonly entitiesImpl: ECSEntitiesImpl;

    constructor() {
        // 避免暴露内部接口
        this.events = this.eventsImpl = new ECSEventsImpl();
        this.systems = this.systemsImpl = new ECSSystemsImpl(this);
        this.entities = this.entitiesImpl = new ECSEntitiesImpl();
        this.components = this.entitiesImpl.components;
    }

    start(): void {
        this.systemsImpl.start();
    }

    stop(): void {
        this.systemsImpl.stop();
    }

    update(dt: number, keepEvents: boolean = false): void {
        // 更新所有系统的状态
        this.systemsImpl.update(dt);
        if (keepEvents !== true) {
            // 由于输入系统产生的事件可能在 update() 之前，
            // 所以只能在 update 之后再清理事件
            this.events.clear();
        }
    }

    clearEvents(): void {
        this.events.clear();
    }
}
