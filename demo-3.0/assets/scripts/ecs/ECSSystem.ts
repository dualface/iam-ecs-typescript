/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSEnvironment } from "./ECSEnvironment";

/**
 * 系统接口
 */
export abstract class ECSSystem {
    /**
     * 系统是否处于允许状态
     */
    enabled = true;

    /**
     * 执行时的优先级，数字更小的系统会更优先执行
     */
    priority = 0;

    /**
     * 系统所在的 ECS 环境
     */
    get ecs(): ECSEnvironment {
        if (!this._ecs) {
            throw new TypeError("ECSSystem.ecs is undefined");
        }
        return this._ecs;
    }

    /**
     * 构造函数，必须从继承类调用
     *
     * @param name 系统的名字
     */
    protected constructor(readonly name: string) {}

    /**
     * 设置系统所属 ECS 环境
     */
    setECSEnvironment(env: ECSEnvironment | undefined) {
        this._ecs = env;
    }

    /**
     * 系统载入
     */
    async load() {}

    /**
     * 系统卸载
     */
    unload(): void {}

    /**
     * 启动系统
     */
    start(): void {}

    /**
     * 停止系统
     */
    stop(): void {}

    /**
     * 更新状态
     *
     * @param _dt
     */
    update(_dt: number): void {}

    //// private

    /**
     * 系统所属的 ECS，由 ECS 设置
     */
    private _ecs: ECSEnvironment | undefined = undefined;
}
