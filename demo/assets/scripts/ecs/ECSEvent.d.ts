/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
/**
 * 事件
 */
export declare class ECSEvent {
    readonly name: string;
    readonly unique: boolean;
    /**
     * 构造函数，必须从继承类调用
     *
     * 如果 `unique = true`，则同名事件即便多次添加到队列，也只会保留一个。
     *
     * @param name 事件名字
     * @param unique 同名事件是否保持唯一性
     */
    protected constructor(name: string, unique?: boolean);
}
//# sourceMappingURL=ECSEvent.d.ts.map