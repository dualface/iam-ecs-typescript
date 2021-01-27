/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSComponents } from "../ECSComponents";
import { ECSEntities } from "../ECSEntities";
import { ECSEnvironment } from "../ECSEnvironment";
import { ECSEvents } from "../ECSEvents";
import { ECSSystems } from "../ECSSystems";
/**
 * ECS 实现
 */
export declare class ECSImpl implements ECSEnvironment {
    readonly events: ECSEvents;
    readonly systems: ECSSystems;
    readonly entities: ECSEntities;
    readonly components: ECSComponents;
    private readonly eventsImpl;
    private readonly systemsImpl;
    private readonly entitiesImpl;
    constructor();
    start(): void;
    stop(): void;
    update(dt: number, keepEvents?: boolean): void;
}
//# sourceMappingURL=ECSImpl.d.ts.map