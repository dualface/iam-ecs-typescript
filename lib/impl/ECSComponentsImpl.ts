/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { IECSComponentInterface } from "../ECSComponent";
import { IECSComponents } from "../ECSComponents";
import { Constructor } from "../__private";

/**
 * 组件集合的实现
 */
export class ECSComponentsImpl implements IECSComponents {
    size(): number {
        return this._all.size;
    }

    all<T extends IECSComponentInterface>(
        constructor: Constructor<T>
    ): Array<T> {
        const name = constructor.name;
        return (
            (this._all.get(name) as Array<T>) ??
            (emptyComponentsSet as Array<T>)
        );
    }

    get<T extends IECSComponentInterface>(constructor: Constructor<T>): T {
        const components = this.all<T>(constructor);
        if (components.length === 0) {
            throw new RangeError(
                `[ECS] not found component '${constructor.name}'`
            );
        }
        return components[0];
    }

    add(component: IECSComponentInterface): void {
        const name = component.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(
                `[ECS] component '${component}' not set name by @ecsclass`
            );
        }

        let components = this._all.get(name);
        if (!components) {
            components = new Array<IECSComponentInterface>();
            this._all.set(name, components);
        }
        components.push(component);
    }

    delete(component: IECSComponentInterface): void {
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
    private readonly _all = new Map<string, Array<IECSComponentInterface>>();
}

//// private

/**
 * 预定义的空组件集合
 */
const emptyComponentsSet = new Array<IECSComponentInterface>();
