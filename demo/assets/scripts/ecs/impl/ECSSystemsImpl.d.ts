/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSSystem } from "../ECSSystem";
import { ECSSystems } from "../ECSSystems";
import { ECSImpl } from "./ECSImpl";
/**
 * ECS 系统集合的实现
 */
export declare class ECSSystemsImpl implements ECSSystems {
    /**
     * 所有已经载入完成的系统，按照优先级排序
     */
    private readonly loaded;
    /**
     * 按照名字查找所有已经载入完成的系统
     */
    private readonly loadedByName;
    /**
     * 保存正在载入中的系统，当 ECSSystem.load() 方法完成后移动到 loaded 队列
     */
    private readonly loading;
    /**
     * 系统的运行状态
     */
    private readonly systemsRunning;
    /**
     * 所属 ECS
     */
    private readonly ecs;
    /**
     * 当前运行状态
     */
    private running;
    /**
     * 目前最大优先级，后添加的系统会自动使用更大的优先级数值
     */
    private maxPriority;
    constructor(ecs: ECSImpl);
    start(): void;
    stop(): void;
    update(dt: number): void;
    get<T extends ECSSystem>(name: string): T;
    add(system: ECSSystem, priority?: number): ECSSystems;
    delete(system: ECSSystem): ECSSystems;
    clear(): ECSSystems;
    sort(): ECSSystems;
    /**
     * 检查 loading 列表中的所有系统是否都已经载入完成
     */
    private checkLoading;
}
//# sourceMappingURL=ECSSystemsImpl.d.ts.map