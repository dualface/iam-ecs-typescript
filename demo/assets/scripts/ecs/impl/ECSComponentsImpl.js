"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSComponentsImpl = void 0;
/**
 * 组件集合的实现
 */
var ECSComponentsImpl = /** @class */ (function () {
    function ECSComponentsImpl() {
        //// private
        /**
         * 按照类型分组的所有组件
         */
        this._all = new Map();
    }
    ECSComponentsImpl.prototype.all = function (name) {
        var _a;
        return ((_a = this._all.get(name)) !== null && _a !== void 0 ? _a : emptyComponentsSet);
    };
    ECSComponentsImpl.prototype.get = function (name) {
        var components = this.all(name);
        if (components.length === 0) {
            throw new RangeError("ECS: component '" + name + "' not found");
        }
        return components[0];
    };
    ECSComponentsImpl.prototype.add = function (component) {
        var name = component.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError("ECS: component have not the name");
        }
        var components = this._all.get(name);
        if (!components) {
            components = new Array();
            this._all.set(name, components);
        }
        components.push(component);
    };
    ECSComponentsImpl.prototype.delete = function (component) {
        var components = this._all.get(component.name);
        if (components) {
            var i = components.indexOf(component);
            components.splice(i, 1);
        }
    };
    ECSComponentsImpl.prototype.clear = function (name) {
        this._all.delete(name);
    };
    return ECSComponentsImpl;
}());
exports.ECSComponentsImpl = ECSComponentsImpl;
//// private
/**
 * 预定义的空组件集合
 */
var emptyComponentsSet = new Array();
