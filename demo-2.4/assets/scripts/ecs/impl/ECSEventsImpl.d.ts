/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSEvent } from "../ECSEvent";
import { ECSEvents } from "../ECSEvents";
/**
 * 事件集合的实现
 */
export declare class ECSEventsImpl implements ECSEvents {
    push(event: ECSEvent): void;
    fetch<T extends ECSEvent>(name: string): Array<T>;
    has(name: string): boolean;
    clear(): void;
    private _events;
}
//# sourceMappingURL=ECSEventsImpl.d.ts.map