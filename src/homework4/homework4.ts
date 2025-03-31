// Interface with index signature, union usega
interface MixValues {
  [key: string]: number | string;
}

// Interface with index signature, value - func
interface FunctionMap {
  [key: string]: (...args: any[]) => any;
}

// Interface with index signature for arrays
interface NumberArray {
  [index: number]: number;
}

// Interface with specific props and signature index
interface Person {
  name: string;
  [key: string]: string | number;
}

// Interface for extend another interface
interface BaseConfig {
  [key: string]: string | number;
}

interface ExtendedConfig extends BaseConfig {
  version: number;
}

// Func to check object with index signature
function areAllNumbers(obj: { [key: string]: any }): boolean {
  return Object.values(obj).every((value) => typeof value === 'number');
}

// Test scenarios
console.log(areAllNumbers({ a: 1, b: 2, c: 3 }));
console.log(areAllNumbers({ a: 1, b: 'hello', c: 3 }));

const example_1: MixValues = {
  id: 123,
  name: 'Alice',
  age: 25,
};
console.log(example_1);

const example_2: FunctionMap = {
  greeting: (name: string) => `Hello, ${name}!`,
  addition: (a: number, b: number) => a + b,
};
console.log(example_2);

const example_3: NumberArray = [10, 20, 30];
console.log(example_3);

const example_4: Person = {
  name: 'Bob',
  age: 30,
  city: 'New York',
};
console.log(example_4);

const example_5: ExtendedConfig = {
  version: 1,
  theme: 'dark',
  timeout: 5000,
};
console.log(example_5);
