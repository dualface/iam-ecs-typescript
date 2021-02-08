"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSEntity = void 0;
/**
 * 用于生成实体唯一 ID
 */
var newEntityID = 0;
/**
 * 实体基础类
 */
var ECSEntity = /** @class */ (function () {
    /**
     * 构造函数
     */
    function ECSEntity() {
        /**
         * 实体的所有组件
         */
        this.components = new Map();
        /**
         * 全局组件集合，由 ECS 指定，让 Entity 可以直接将组件添加到 ECS 中
         */
        this.__globalComponents = undefined;
        //// private
        /**
         * 实体当前是否可用
         */
        this._enabled = false;
        newEntityID++;
        this.id = newEntityID.toString();
    }
    /**
     * 返回实体可用状态
     */
    ECSEntity.prototype.isEnabled = function () {
        return this._enabled;
    };
    /**
     * 设置实体的所有组件是否可用
     *
     * @param enabled
     */
    ECSEntity.prototype.setEnabled = function (enabled) {
        var _this = this;
        if (this._enabled === enabled || !this.__globalComponents) {
            // 状态未改变，或者还未添加到 ECS 中的实体，设置 enabled 不起作用
            return;
        }
        this._enabled = enabled;
        if (enabled) {
            // 把组件添加到全局组件列表
            this.components.forEach(function (component) {
                var _a;
                (_a = _this.__globalComponents) === null || _a === void 0 ? void 0 : _a.add(component);
            });
        }
        else {
            // 从全局组件列表移除组件
            this.components.forEach(function (component) {
                var _a;
                (_a = _this.__globalComponents) === null || _a === void 0 ? void 0 : _a.delete(component);
            });
        }
    };
    /**
     * 添加组件到实体
     *
     * @param component
     */
    ECSEntity.prototype.addComponent = function (component) {
        if (this.components.has(component.name)) {
            throw new RangeError("ECSEntity.addComponent(): component '" + component.name + "' already exists");
        }
        component.entityID = this.id;
        if (this.__globalComponents) {
            this.__globalComponents.add(component);
        }
        this.components.set(component.name, component);
        return this;
    };
    /**
     * 检查指定的组件是否存在
     *
     * @param name
     */
    ECSEntity.prototype.hasComponent = function (name) {
        return this.components.has(name);
    };
    /**
     * 取得指定名字的组件
     *
     * @param name
     */
    ECSEntity.prototype.getComponent = function (name) {
        var component = this.components.get(name);
        if (!component) {
            throw new RangeError("ECSEntity.getComponent(): component '" + name + "' not found");
        }
        return component;
    };
    /**
     * 移除组件
     *
     * @param name
     */
    ECSEntity.prototype.removeComponent = function (name) {
        if (!this.components.has(name)) {
            throw new RangeError("ECSEntity.removeComponent(): component '" + name + "' not found");
        }
        var component = this.components.get(name);
        if (component && this.__globalComponents) {
            this.__globalComponents.delete(component);
        }
        this.components.delete(name);
        return this;
    };
    /**
     * 移除所有组件
     */
    ECSEntity.prototype.removeAllComponents = function () {
        var _this = this;
        if (this.__globalComponents) {
            this.components.forEach(function (component) {
                var _a;
                (_a = _this.__globalComponents) === null || _a === void 0 ? void 0 : _a.delete(component);
            });
        }
        this.components.clear();
        return this;
    };
    return ECSEntity;
}());
exports.ECSEntity = ECSEntity;
