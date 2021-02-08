/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
/**
 * 组件
 */
export declare abstract class ECSComponent {
    readonly name: string;
    /**
     * 组件的所有者实体 ID
     */
    entityID: string;
    /**
     * 构造函数，必须从继承类调用
     *
     * @param name 组件名字
     */
    protected constructor(name: string);
}
//# sourceMappingURL=ECSComponent.d.ts.map