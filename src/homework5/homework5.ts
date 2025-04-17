// DeepReadonly: makes all properties (including nested ones) readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

// DeepRequireReadonly: makes all properties required and readonly, recursively
type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepRequireReadonly<T[K]>
    : T[K];
};

// UpperCaseKeys: transforms all keys to uppercase
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

// ObjectToPropertyDescriptor: transforms a regular object into an object where each value is a property descriptor
type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: {
    configurable: true;
    enumerable: true;
    writable: true;
    value: T[K];
  };
};
