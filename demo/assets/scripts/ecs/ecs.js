"use strict";
/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createECSEnv = void 0;
var ECSImpl_1 = require("./impl/ECSImpl");
__exportStar(require("./ECSComponent"), exports);
__exportStar(require("./ECSEntity"), exports);
__exportStar(require("./ECSEnvironment"), exports);
__exportStar(require("./ECSEvent"), exports);
__exportStar(require("./ECSSystem"), exports);
/**
 * 创建 ECS 环境
 */
function createECSEnv() {
    return new ECSImpl_1.ECSImpl();
}
exports.createECSEnv = createECSEnv;
