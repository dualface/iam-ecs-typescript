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
    private readonly entities = new Set<ECSEntity>();

    /**
     * 按照实体 ID 跟踪所有实体
     */
    private readonly entitiesByID = new Map<string, ECSEntity>();

    has(id: string): boolean {
        return this.entitiesByID.has(id);
    }

    get(id: string): ECSEntity {
        const entity = this.entitiesByID.get(id);
        if (!entity) {
            throw new RangeError(`ECS: entity '${id}' not found`);
        }
        return entity;
    }

    add(entity: ECSEntity): void {
        entity.__globalComponents = this.components;
        entity.setEnabled(true);
        this.entities.add(entity);
        this.entitiesByID.set(entity.id, entity);
    }

    delete(id: string): void;
    delete(entity: ECSEntity): void;
    delete(entity: string | ECSEntity): void {
        if (typeof entity === "string") {
            entity = this.get(entity);
        }
        entity.setEnabled(false);
        entity.__globalComponents = undefined;
        this.entities.delete(entity);
        this.entitiesByID.delete(entity.id);
    }

    clear(): void {
        this.entities.forEach((entity) => this.delete(entity));
    }
}
