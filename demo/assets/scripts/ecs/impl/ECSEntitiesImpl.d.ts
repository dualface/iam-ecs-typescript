/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSEntities } from "../ECSEntities";
import { ECSEntity } from "../ECSEntity";
import { ECSComponentsImpl } from "./ECSComponentsImpl";
/**
 * 实体集合的实现
 */
export declare class ECSEntitiesImpl implements ECSEntities {
    /**
     * 跟踪所有组件
     */
    readonly components: ECSComponentsImpl;
    /**
     * 跟踪所有实体
     */
    private readonly entities;
    /**
     * 按照实体 ID 跟踪所有实体
     */
    private readonly entitiesByID;
    has(id: string): boolean;
    get(id: string): ECSEntity;
    add(entity: ECSEntity): void;
    delete(id: string): void;
    delete(entity: ECSEntity): void;
    clear(): void;
}
//# sourceMappingURL=ECSEntitiesImpl.d.ts.map