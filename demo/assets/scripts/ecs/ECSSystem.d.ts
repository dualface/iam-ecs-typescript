/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */
import { ECSEnvironment } from "./ECSEnvironment";
/**
 * 系统接口
 */
export declare abstract class ECSSystem {
    readonly name: string;
    /**
     * 系统是否处于允许状态
     */
    enabled: boolean;
    /**
     * 执行时的优先级，数字更小的系统会更优先执行
     */
    priority: number;
    /**
     * 系统所在的 ECS 环境
     */
    get ecs(): ECSEnvironment;
    /**
     * 构造函数，必须从继承类调用
     *
     * @param name 系统的名字
     */
    protected constructor(name: string);
    /**
     * 设置系统所属 ECS 环境
     */
    setECSEnvironment(env: ECSEnvironment | undefined): void;
    /**
     * 系统载入
     */
    load(): Promise<void>;
    /**
     * 系统卸载
     */
    unload(): void;
    /**
     * 启动系统
     */
    start(): void;
    /**
     * 停止系统
     */
    stop(): void;
    /**
     * 更新状态
     *
     * @param _dt
     */
    update(_dt: number): void;
    /**
     * 系统所属的 ECS，由 ECS 设置
     */
    private _ecs;
}
//# sourceMappingURL=ECSSystem.d.ts.map