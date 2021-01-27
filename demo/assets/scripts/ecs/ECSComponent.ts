/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

/**
 * 组件
 */
export abstract class ECSComponent {
    /**
     * 组件名字
     */
    get name(): string {
        if (typeof this._name !== "string" || this._name.length === 0) {
            throw new TypeError(
                `The class inherited from ECSComponent not set name, ${this}`
            );
        }
        return this._name;
    }

    /**
     * 组件的所有者实体 ID
     */
    entityID: string = "";

    /**
     * 构造函数，必须从继承类调用
     *
     * @param name
     */
    protected constructor(name: string) {
        this._name = name;
    }

    //// private

    /**
     * 存储组件名字
     */
    private _name: string;
}

/**
 * 组件迭代器函数
 */
export interface ECSComponentsIteratorFn {
    (component: ECSComponent): void;
}

/**
 * 组件集合
 */
export interface ECSComponents {
    /**
     * 查询特定名字的所有组件
     *
     * @param name
     */
    all<T extends ECSComponent>(name: string): Array<T>;

    /**
     * 查询特定名字的第一个组件
     *
     * @param name
     */
    get<T extends ECSComponent>(name: string): T;

    /**
     * 添加组件
     *
     * @param component
     */
    add(component: ECSComponent): void;

    /**
     * 移除组件
     *
     * @param component
     */
    remove(component: ECSComponent): void;

    /**
     * 移除特定名字的所有组件
     *
     * @param name
     */
    removeAll(name: string): void;

    /**
     * 遍历所有组件
     *
     * @param fn
     */
    forEach(fn: ECSComponentsIteratorFn): void;
}
