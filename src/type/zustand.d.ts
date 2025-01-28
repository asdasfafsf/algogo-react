type Updater<T> = T | ((prev: T) => T | Promise<T>);

type StoreState<T> = {
  value: T;
  setValue: (updateFnOrValue: Updater<T>) => void;
};
