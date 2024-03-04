/* eslint-disable @typescript-eslint/no-explicit-any */
import { LearningPlatformRequest } from './requests';

type Tail<T extends any[]> = ((...args: T) => any) extends (
  arg: any,
  ...rest: infer U
) => any
  ? U
  : never;

type ArgsWithoutConfig<F extends (...args: any[]) => any> = Tail<Parameters<F>>;

type FuncWithoutConfigArg<F extends (...args: any[]) => any> = (
  ...args: ArgsWithoutConfig<F>
) => ReturnType<F>;

export type LearningPlatformQueryExecutor = {
  [K in keyof typeof LearningPlatformRequest]: FuncWithoutConfigArg<
    (typeof LearningPlatformRequest)[K]
  >;
};
