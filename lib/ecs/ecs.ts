/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEnvironment } from "./ECSEnvironment";
import { ECSImpl } from "./impl/ECSImpl";

export * from "./ECSComponent";
export * from "./ECSEntity";
export * from "./ECSEnvironment";
export * from "./ECSEvent";
export * from "./ECSSystem";

/**
 * 创建 ECS 环境
 */
export function createECSEnv(): ECSEnvironment {
    return new ECSImpl();
}
