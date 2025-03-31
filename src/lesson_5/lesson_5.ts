// // public, protected, private

// class Animal {
//   private static DEFAUL_NAME = 'animal';
//   private _name = Animal.DEFAUL_NAME;

//   public get name(): string {
//     return this._name;
//   }
//   public set name(value: string) {}

//   public constructor() {}

//   protected static inputInfo(text: string): string {
//     return `[obgect ${text}]`;
//   }
//   public toString(): string {
//     return Animal.inputInfo('Animal');
//   }
// }

// const animal: Animal = new Animal();
// animal.name = 'newanimal';

// // coupling

// class AnimalUtil {
//     private static MS_TO_DAY = 1000 * 60 * 60 / 24;

//     private constructor() {}

//     public static ageFromMSToDayFormat(time: number): number {
//         return Math.ceil(time / AnimalUtil.MS_TO_DAY)
//     }
// }
//     class Animal {
//         private _timeToBieth = Date.now();
//         public get age(): number {
//             return this._timeToBieth - Date.now();
//         }
//         public constructor() {}
//     }

//     class animal = new Animal();
