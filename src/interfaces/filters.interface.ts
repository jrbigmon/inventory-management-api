export type Filter<T> = {
  [key in keyof T]?: any;
};
