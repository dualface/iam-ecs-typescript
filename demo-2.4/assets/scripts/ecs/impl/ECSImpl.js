"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSImpl = void 0;
var ECSEntitiesImpl_1 = require("./ECSEntitiesImpl");
var ECSEventsImpl_1 = require("./ECSEventsImpl");
var ECSSystemsImpl_1 = require("./ECSSystemsImpl");
/**
 * ECS 实现
 */
var ECSImpl = /** @class */ (function () {
    function ECSImpl() {
        // 避免暴露内部接口
        this.events = this.eventsImpl = new ECSEventsImpl_1.ECSEventsImpl();
        this.systems = this.systemsImpl = new ECSSystemsImpl_1.ECSSystemsImpl(this);
        this.entities = this.entitiesImpl = new ECSEntitiesImpl_1.ECSEntitiesImpl();
        this.components = this.entitiesImpl.components;
    }
    ECSImpl.prototype.start = function () {
        this.systemsImpl.start();
    };
    ECSImpl.prototype.stop = function () {
        this.systemsImpl.stop();
    };
    ECSImpl.prototype.update = function (dt, keepEvents) {
        if (keepEvents === void 0) { keepEvents = false; }
        // 更新所有系统的状态
        this.systemsImpl.update(dt);
        if (keepEvents !== true) {
            // 由于输入系统产生的事件可能在 update() 之前，
            // 所以只能在 update 之后再清理事件
            this.events.clear();
        }
    };
    return ECSImpl;
}());
exports.ECSImpl = ECSImpl;
