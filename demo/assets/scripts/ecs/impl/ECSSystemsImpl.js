"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECSSystemsImpl = void 0;
/**
 * ECS 系统集合的实现
 */
var ECSSystemsImpl = /** @class */ (function () {
    function ECSSystemsImpl(ecs) {
        /**
         * 所有已经载入完成的系统，按照优先级排序
         */
        this.loaded = new Array();
        /**
         * 按照名字查找所有已经载入完成的系统
         */
        this.loadedByName = new Map();
        /**
         * 保存正在载入中的系统，当 ECSSystem.load() 方法完成后移动到 loaded 队列
         */
        this.loading = new Map();
        /**
         * 系统的运行状态
         */
        this.systemsRunning = new Map();
        /**
         * 当前运行状态
         */
        this.running = false;
        /**
         * 目前最大优先级，后添加的系统会自动使用更大的优先级数值
         */
        this.maxPriority = 0;
        this.ecs = ecs;
    }
    ECSSystemsImpl.prototype.start = function () {
        if (this.running) {
            throw new RangeError("ECS: already is running");
        }
        this.running = true;
        this.checkLoading();
    };
    ECSSystemsImpl.prototype.stop = function () {
        var _this = this;
        if (!this.running) {
            throw new RangeError("ECS: not running");
        }
        // 停止所有正在运行的系统
        this.loadedByName.forEach(function (system, name) {
            if (_this.systemsRunning.get(name) === true) {
                system.stop();
            }
            _this.systemsRunning.set(name, false);
        });
        this.running = false;
    };
    ECSSystemsImpl.prototype.update = function (dt) {
        for (var _i = 0, _a = this.loaded; _i < _a.length; _i++) {
            var system = _a[_i];
            if (system.enabled) {
                system.update(dt);
            }
        }
    };
    ECSSystemsImpl.prototype.get = function (name) {
        var system = this.loadedByName.get(name);
        if (!system) {
            throw new RangeError("ECS: system '" + name + "' not found");
        }
        return system;
    };
    ECSSystemsImpl.prototype.add = function (system, priority) {
        var _this = this;
        var name = system.name;
        if (typeof name !== "string" || name.length === 0) {
            throw new RangeError("ECS: system have not the name");
        }
        if (this.loadedByName.has(name)) {
            throw new RangeError("ECS: system '" + name + "' already exists");
        }
        if (this.loading.has(name)) {
            throw new RangeError("ECS: system '" + name + "' already in loading");
        }
        // 设置系统运行初始状态
        system.setECSEnvironment(this.ecs);
        if (typeof priority === "number") {
            system.priority = priority;
            if (priority > this.maxPriority) {
                this.maxPriority = priority + 1;
            }
        }
        else {
            system.priority = this.maxPriority;
            this.maxPriority++;
        }
        this.systemsRunning.set(system.name, false);
        // 加入 loading 列表
        this.loading.set(name, [system, false]);
        system
            .load()
            .then(function () {
            // 更新 loading 列表状态
            _this.loading.set(name, [system, true]);
            // 检查 loading 列表
            _this.checkLoading();
        })
            .catch(function (e) {
            throw e;
        });
        return this;
    };
    ECSSystemsImpl.prototype.delete = function (system) {
        var name = system.name;
        if (this.loadedByName.has(name)) {
            // 从载入完成的列表中删除指定 system
            for (var i = 0, l = this.loaded.length; i < l; i++) {
                if (this.loaded[i].name === name) {
                    this.loaded.splice(i, 1);
                    break;
                }
            }
            this.loadedByName.delete(name);
        }
        else if (this.loading.has(name)) {
            // 从正在载入的列表中删除指定 system
            this.loading.delete(name);
        }
        else {
            throw new RangeError("ECS: not found system '" + name);
        }
        // 检查是否需要停止系统
        if (this.systemsRunning.get(name)) {
            system.stop();
        }
        this.systemsRunning.delete(name);
        // 卸载系统
        system.unload();
        system.setECSEnvironment(undefined);
        // 检查载入中的系统
        this.checkLoading();
        return this;
    };
    ECSSystemsImpl.prototype.clear = function () {
        var _this = this;
        this.loadedByName.forEach(function (system) { return _this.delete(system); });
        this.loading.forEach(function (pair) { return _this.delete(pair[0]); });
        return this;
    };
    ECSSystemsImpl.prototype.sort = function () {
        this.loaded.sort(function (a, b) {
            if (a.priority > b.priority) {
                return 1;
            }
            else if (a.priority < b.priority) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return this;
    };
    //// private
    /**
     * 检查 loading 列表中的所有系统是否都已经载入完成
     */
    ECSSystemsImpl.prototype.checkLoading = function () {
        var _this = this;
        // 已经载入完成的系统移动到 loaded 列表
        // 未载入完成的保持在 loading 列表中
        this.loading.forEach(function (pair, name) {
            if (!pair[1])
                return;
            var system = pair[0];
            _this.loaded.push(system);
            _this.loadedByName.set(name, system);
            _this.loading.delete(name);
        });
        // 重新排序
        this.sort();
        if (this.loading.size > 0) {
            // 如果还有系统未加载完成，则继续等待
            return;
        }
        if (!this.running)
            return;
        // 启动所有还未启动的系统
        for (var _i = 0, _a = this.loaded; _i < _a.length; _i++) {
            var system = _a[_i];
            if (this.systemsRunning.get(system.name) === true)
                continue;
            system.start();
            this.systemsRunning.set(system.name, true);
        }
    };
    return ECSSystemsImpl;
}());
exports.ECSSystemsImpl = ECSSystemsImpl;
