/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEvent } from "../ECSEvent";
import { ECSEvents } from "../ECSEvents";
import { Constructor } from "../__private";

/**
 * 事件集合的实现
 */
export class ECSEventsImpl implements ECSEvents {
    push(event: ECSEvent): void {
        const name = event.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] event '${event}' not set name by @ecsclass`
            );
        }

        let list = this._events.get(name);
        if (!list) {
            list = new Array<ECSEvent>();
            this._events.set(name, list);
        }
        if (event.unique) {
            list.length = 0;
        }
        list.push(event);
    }

    fetch<T extends ECSEvent>(constructor: Constructor<T>): T[] {
        const name = constructor.name;
        return (
            (this._events.get(name) as Array<T>) ?? (emptyEventList as Array<T>)
        );
    }

    has<T extends ECSEvent>(constructor: Constructor<T>): boolean {
        const events = this._events.get(constructor.name);
        return events ? events.length > 0 : false;
    }

    clear(): void {
        this._events.clear();
    }

    //// private

    private _events = new Map<string, Array<ECSEvent>>();
}

/// private

const emptyEventList = new Array<ECSEvent>();
