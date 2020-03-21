/// <reference types="react-scripts" />

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
