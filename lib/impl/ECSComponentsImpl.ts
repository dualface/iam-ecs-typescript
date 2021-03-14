/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponentInterface } from "../ECSComponent";
import { ECSComponents } from "../ECSComponents";
import { Constructor } from "../__private";

/**
 * 组件集合的实现
 */
export class ECSComponentsImpl implements ECSComponents {
    size(): number {
        return this._all.size;
    }

    all<T extends ECSComponentInterface>(
        constructor: Constructor<T>
    ): Array<T> {
        const name = constructor.name;
        return (
            (this._all.get(name) as Array<T>) ??
            (emptyComponentsSet as Array<T>)
        );
    }

    get<T extends ECSComponentInterface>(constructor: Constructor<T>): T {
        const components = this.all<T>(constructor);
        if (components.length === 0) {
            throw new RangeError(
                `[ECS] not found component '${constructor.name}'`
            );
        }
        return components[0];
    }

    add(component: ECSComponentInterface): void {
        const name = component.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] component '${component}' not set name by @ecsclass`
            );
        }

        let components = this._all.get(name);
        if (!components) {
            components = new Array<ECSComponentInterface>();
            this._all.set(name, components);
        }
        components.push(component);
    }

    delete(component: ECSComponentInterface): void {
        const components = this._all.get(component.name);
        if (components) {
            const i = components.indexOf(component);
            components.splice(i, 1);
        }
    }

    //// private

    /**
     * 按照类型分组的所有组件
     */
    private readonly _all = new Map<string, Array<ECSComponentInterface>>();
}

//// private

/**
 * 预定义的空组件集合
 */
const emptyComponentsSet = new Array<ECSComponentInterface>();
