/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "../ECSComponent";
import { ECSComponents } from "../ECSComponents";

/**
 * 组件集合的实现
 */
export class ECSComponentsImpl implements ECSComponents {
    size(): number {
        return this._all.size;
    }

    all<T extends ECSComponent>(name: string): Array<T> {
        return (
            (this._all.get(name) as Array<T>) ??
            (emptyComponentsSet as Array<T>)
        );
    }

    get<T extends ECSComponent>(name: string): T {
        const components = this.all<T>(name);
        if (components.length === 0) {
            throw new RangeError(`ECS: component '${name}' not found`);
        }
        return components[0];
    }

    add(component: ECSComponent): void {
        const name = component.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError(`ECS: component have not the name`);
        }

        let components = this._all.get(name);
        if (!components) {
            components = new Array<ECSComponent>();
            this._all.set(name, components);
        }
        components.push(component);
    }

    delete(component: ECSComponent): void {
        const components = this._all.get(component.name);
        if (components) {
            const i = components.indexOf(component);
            components.splice(i, 1);
        }
    }

    clear(name: string): void {
        this._all.delete(name);
    }

    //// private

    /**
     * 按照类型分组的所有组件
     */
    private readonly _all = new Map<string, Array<ECSComponent>>();
}

//// private

/**
 * 预定义的空组件集合
 */
const emptyComponentsSet = new Array<ECSComponent>();
