// // Union type

// let foo: number | string | boolean = 'hello world';
// console.log(foo)

// foo = 'goodbye world'
// console.log(foo)

// foo = 10
// console.log(foo)

// foo = true
// console.log(foo)

// class A {
//     a: number;
// }
// class B {
//     b: string;
// }
// class C {
//     c: boolean;
// }

// let name: A & B & C;

////////////////////////////////////
/////           Enum           /////
////////////////////////////////////

// enum Fruits {
//     Apple = 2,
//     Pear = 10,
//     Banana,
//     Lime = Pear,
//     Orange = 10,
// }

// console.log(Fruits[10])
// console.log(Fruits.Lime)

// let Fruits = {};

// function initialisation(Fruits){
//     Fruits[(Fruits['Apple'] = 0)] = 'Apple';
// }

// Intarfaces

// enum FruitsColor {
//     Red = '#ff0000',
//     Green = '#00ff00',
//     Blue = '#0000ff',
//     Raw = Red,
// }

// console.log(FruitsColor)

// const enum Apple {
//     Sugar = 10,
// }

// const enum Pear {
//     Sugar = 10,
// }

// const calcSugar: number = Apple.Sugar + Pear.Sugar;

// console.log(calcSugar)

////////////////////////////////////
/////        Literal type      /////
////////////////////////////////////

// Number.MIN_VALUE
// Number.MAX_VALUE

// const port80: number = 80;
// const port42: number = 42;

// type ValidPortValue = 80 | 42;

// function start(port: ValidPortValue): void {
//     if(port !== port80 || port !== port42) {
//         throw new Error('Error')
//     }
//     //start
// }

// start(80)

// type NumberLiteralType = 0b101 | 0o5 | 5 | 0x5;

// StringLiteralTypes

// function animal(name: 'ease-in' | 'ease-out'): void {}

// animal("ease-in");
// animal("ease-out-");

// type Type = 'Type';
// type Script = 'Script';

// type Message = `I love ${Type}${Script}`;
