/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEntities } from "../ECSEntities";
import { ECSEntity } from "../ECSEntity";
import { ECSComponentsImpl } from "./ECSComponentsImpl";

/**
 * 实体集合的实现
 */
export class ECSEntitiesImpl implements ECSEntities {
    /**
     * 跟踪所有组件
     */
    readonly components = new ECSComponentsImpl();

    /**
     * 跟踪所有实体
     */
    private readonly _all = new Set<ECSEntity>();

    /**
     * 按照实体 ID 跟踪所有实体
     */
    private readonly _allByID = new Map<string, ECSEntity>();

    size(): number {
        return this._all.size;
    }

    has(id: string): boolean {
        return this._allByID.has(id);
    }

    get(id: string): ECSEntity {
        const entity = this._allByID.get(id);
        if (!entity) {
            throw new RangeError(`ECS: entity '${id}' not found`);
        }
        return entity;
    }

    add(entity: ECSEntity): void {
        entity.__globalComponents = this.components;
        entity.setEnabled(true);
        this._all.add(entity);
        this._allByID.set(entity.id, entity);
    }

    delete(id: string): void;
    delete(entity: ECSEntity): void;
    delete(entity: string | ECSEntity): void {
        if (typeof entity === "string") {
            entity = this.get(entity);
        }
        entity.setEnabled(false);
        entity.__globalComponents = undefined;
        this._all.delete(entity);
        this._allByID.delete(entity.id);
    }

    clear(): void {
        this._all.forEach((entity) => this.delete(entity));
    }
}
