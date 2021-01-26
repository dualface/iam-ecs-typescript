/**
 * 事件
 */
export class ECSEvent {
    /**
     * 返回名字
     */
    get name(): string {
        if (typeof this._name !== "string" || this._name.length === 0) {
            throw new TypeError(
                `The class inherited from ECSEvent not set name, ${this}`
            );
        }
        return this._name;
    }

    /**
     * 构造函数，必须从继承类调用
     *
     * 如果 `unique = true`，则同名事件即便多次添加到队列，也只会保留一个。
     *
     * @param name 事件名字
     * @param unique 同名事件是否保持唯一性
     */
    protected constructor(name: string, readonly unique: boolean = false) {
        this._name = name;
    }

    //// private

    /**
     * 事件名
     */
    private _name: string;
}

/**
 * 事件队列
 */
export interface ECSEvents {
    /**
     * 追加事件到队列
     *
     * @param event
     */
    push(event: ECSEvent): void;

    /**
     * 读取指定的事件列表
     *
     * @param name
     */
    fetch<T extends ECSEvent>(name: string): Array<T>;

    /**
     * 检查是否能存在指定事件
     *
     * @param name
     */
    has(name: string): boolean;

    /**
     * 清理所有事件
     */
    clear(): void;
}
