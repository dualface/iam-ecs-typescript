"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSComponent = void 0;
/**
 * 组件
 */
var ECSComponent = /** @class */ (function () {
    /**
     * 构造函数，必须从继承类调用
     *
     * @param name 组件名字
     */
    function ECSComponent(name) {
        this.name = name;
        /**
         * 组件的所有者实体 ID
         */
        this.entityID = "";
    }
    return ECSComponent;
}());
exports.ECSComponent = ECSComponent;
