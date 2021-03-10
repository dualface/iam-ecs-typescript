/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEnvironment } from "./lib/ECSEnvironment";
import { ECSImpl } from "./lib/impl/ECSImpl";

export * from "./lib/ECSComponent";
export * from "./lib/ECSEntity";
export * from "./lib/ECSEnvironment";
export * from "./lib/ECSEvent";
export * from "./lib/ECSSystem";
export { ecsclass } from "./lib/__private";

/**
 * 创建 ECS 环境
 */
export function createECSEnv(): ECSEnvironment {
    return new ECSImpl();
}
