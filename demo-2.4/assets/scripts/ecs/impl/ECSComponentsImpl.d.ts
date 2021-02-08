/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSComponent } from "../ECSComponent";
import { ECSComponents } from "../ECSComponents";
/**
 * 组件集合的实现
 */
export declare class ECSComponentsImpl implements ECSComponents {
    all<T extends ECSComponent>(name: string): Array<T>;
    get<T extends ECSComponent>(name: string): T;
    add(component: ECSComponent): void;
    delete(component: ECSComponent): void;
    clear(name: string): void;
    /**
     * 按照类型分组的所有组件
     */
    private readonly _all;
}
//# sourceMappingURL=ECSComponentsImpl.d.ts.map