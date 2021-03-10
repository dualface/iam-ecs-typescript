export type Constructor<T = unknown> = new (...args: any[]) => T;

export function ecsclass(name: string) {
    return (ctor: Function) => {
        Object.defineProperty(ctor, "name", {
            value: name,
            writable: false,
        });
    };
}
