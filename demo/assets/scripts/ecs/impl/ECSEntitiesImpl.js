"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSEntitiesImpl = void 0;
var ECSComponentsImpl_1 = require("./ECSComponentsImpl");
/**
 * 实体集合的实现
 */
var ECSEntitiesImpl = /** @class */ (function () {
    function ECSEntitiesImpl() {
        /**
         * 跟踪所有组件
         */
        this.components = new ECSComponentsImpl_1.ECSComponentsImpl();
        /**
         * 跟踪所有实体
         */
        this.entities = new Set();
        /**
         * 按照实体 ID 跟踪所有实体
         */
        this.entitiesByID = new Map();
    }
    ECSEntitiesImpl.prototype.has = function (id) {
        return this.entitiesByID.has(id);
    };
    ECSEntitiesImpl.prototype.get = function (id) {
        var entity = this.entitiesByID.get(id);
        if (!entity) {
            throw new RangeError("ECS: entity '" + id + "' not found");
        }
        return entity;
    };
    ECSEntitiesImpl.prototype.add = function (entity) {
        entity.__globalComponents = this.components;
        entity.setEnabled(true);
        this.entities.add(entity);
        this.entitiesByID.set(entity.id, entity);
    };
    ECSEntitiesImpl.prototype.delete = function (entity) {
        if (typeof entity === "string") {
            entity = this.get(entity);
        }
        entity.setEnabled(false);
        entity.__globalComponents = undefined;
        this.entities.delete(entity);
        this.entitiesByID.delete(entity.id);
    };
    ECSEntitiesImpl.prototype.clear = function () {
        var _this = this;
        this.entities.forEach(function (entity) { return _this.delete(entity); });
    };
    return ECSEntitiesImpl;
}());
exports.ECSEntitiesImpl = ECSEntitiesImpl;
