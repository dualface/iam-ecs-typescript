"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSEvent = void 0;
/**
 * 事件
 */
var ECSEvent = /** @class */ (function () {
    /**
     * 构造函数，必须从继承类调用
     *
     * 如果 `unique = true`，则同名事件即便多次添加到队列，也只会保留一个。
     *
     * @param name 事件名字
     * @param unique 同名事件是否保持唯一性
     */
    function ECSEvent(name, unique) {
        if (unique === void 0) { unique = false; }
        this.name = name;
        this.unique = unique;
    }
    return ECSEvent;
}());
exports.ECSEvent = ECSEvent;
