export * from './todos';


export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms * 1000));