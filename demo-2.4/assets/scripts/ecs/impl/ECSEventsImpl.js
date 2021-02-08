"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSEventsImpl = void 0;
/**
 * 事件集合的实现
 */
var ECSEventsImpl = /** @class */ (function () {
    function ECSEventsImpl() {
        //// private
        this._events = new Map();
    }
    ECSEventsImpl.prototype.push = function (event) {
        var name = event.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError("ECS: event have not the name");
        }
        var list = this._events.get(event.name);
        if (!list) {
            list = new Array();
            this._events.set(event.name, list);
        }
        if (event.unique) {
            list.length = 0;
        }
        list.push(event);
    };
    ECSEventsImpl.prototype.fetch = function (name) {
        var _a;
        return ((_a = this._events.get(name)) !== null && _a !== void 0 ? _a : emptyEventList);
    };
    ECSEventsImpl.prototype.has = function (name) {
        var events = this._events.get(name);
        return events ? events.length > 0 : false;
    };
    ECSEventsImpl.prototype.clear = function () {
        this._events.clear();
    };
    return ECSEventsImpl;
}());
exports.ECSEventsImpl = ECSEventsImpl;
/// private
var emptyEventList = new Array();
