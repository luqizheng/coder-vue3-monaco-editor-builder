export * from "./JavascriptBuilder";
export * from "./MonacoBuilder";
export * from "./MonacoEditor";
export enum CodeRelative{
    global,
    /**
     * 单独的提示逻辑，只和global的有关
     */
    independ
}
export type IntellisenceEnv={
    set(key:string,code:string):IntellisenceEnv
    remove(key:string):IntellisenceEnv
    setEs5():IntellisenceEnv
    removeEs5():IntellisenceEnv
    setEs6():IntellisenceEnv
    removeEs6():IntellisenceEnv,
    setNoLib():IntellisenceEnv
}