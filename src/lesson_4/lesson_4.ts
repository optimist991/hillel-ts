// interface
// 
// import { CANCELLED } from "dns";

// interface Identificator {

// }

// class T {
//     public method(): void {
//         interface Identificator {}
//     }
// }

// function fn(): void {
//     interface Identificator{}
// }

// // interface User {}
// // interface Product {}

// class Product {}
// interface IProduct {}
// interface IUser {}
// interface IIndex {}


// Implements

// interface IAnimal {
//     name: string;
//     run(): void;
// }
// interface IPet {
//     address: string
// }

// class Cat implements IAnimal, IPet {
//     name: string;
//     address: string;

//     run(): void {}
// }

// interface IWildCat {}

// class Lion extends Cat implements IWildCat {}


// interface IAnimal {
//     id: string;
// }

// class Cat implements IAnimal {
//     get id():string {
//         return 'cat';
//     }
// }

// class Dog implements IAnimal {
//     get id(val:string) {}
// }

// new(p1: string, p2: number): type;

// interface IAnimal {
//     name: string
// }

// class Animal implements IAnimal{
//     name: string;

//     constructor(name: string) {
//         this.name = name;
//     }
// }

// class Cat extends Animal {
//     static DEFAULT_NAME = 'cat';

//     static create(): IAnimal {
//         return new Cat(Cat.DEFAULT_NAME);
//     }
// }

// class Dog extends Animal {
//     static DEFAULT_NAME = 'cat';

//     static create(): IAnimal {
//         return new Dog(Dog.DEFAULT_NAME);
//     }
// }

// const cat: Cat = new Cat('cat');
// const dog: Dog = new Dog('fish');
// const a: IAnimal[] = [cat, dog];
// const b: IAnimal[] = [Cat, Dog];

// interface IAnimalConstructor {
//     new (name: string): IAnimal;
//     create(): IAnimal;
// }

// const c: IAnimalConstructor[] = [Cat, Dog];
// const d: IAnimal[] = c.map((item) => item.create())

// Inline Interface

