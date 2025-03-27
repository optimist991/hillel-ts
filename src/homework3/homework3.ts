// Interface for all shapes - that have same parameters
interface IShape {
  readonly color: string;
  readonly name: string;
  calculateArea(): number;
}

//Interface for shapes that can print square calculation
interface IPrintable {
  print(): void;
}

// Circle class with implements from IShape in it (but I create calculateArea for tests)
class Circle implements IShape {
  readonly name: string = 'Circle';

  constructor(
    public readonly color: string,
    public readonly radius: number,
  ) {}

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// Rectangle class with implementing from IShape and IPrintable (cause it can be calculated)
class Rectangle implements IShape, IPrintable {
  readonly name: string = 'Rectangle';

  constructor(
    public readonly color: string,
    public readonly width: number,
    public readonly height: number,
  ) {}

  calculateArea(): number {
    return this.width * this.height;
  }

  print(): void {
    console.log(
      `Area formula: width * height = ${this.width} * ${this.height}`,
    );
  }
}

// Square class with implementing from IShape and IPrintable (can be calculated)
class Square implements IShape, IPrintable {
  readonly name: string = 'Square';

  constructor(
    public readonly color: string,
    public readonly side: number,
  ) {}

  calculateArea(): number {
    return this.side ** 2;
  }

  print(): void {
    console.log(`Area formula: side * side = ${this.side} * ${this.side}`);
  }
}

// Triangle class with implementing with IShape without IPrintable (but I still create calculateArea for tests)
class Triangle implements IShape {
  readonly name: string = 'Triangle';

  constructor(
    public readonly color: string,
    public readonly base: number,
    public readonly height: number,
  ) {}

  calculateArea(): number {
    return 0.5 * this.base * this.height;
  }
}

// Example for test:
const circle: Circle = new Circle('Red', 30);
console.log(
  `${circle.name} (Color: ${circle.color}) Area: ${circle.calculateArea()}`,
);

const rectangle: Rectangle = new Rectangle('Blue', 5, 10);
console.log(
  `${rectangle.name} (Color: ${rectangle.color}) Area: ${rectangle.calculateArea()}`,
);
rectangle.print();

const square: Square = new Square('Green', 4);
console.log(
  `${square.name} (Color: ${square.color}) Area: ${square.calculateArea()}`,
);
square.print();

const triangle: Triangle = new Triangle('Yellow', 6, 8);
console.log(
  `${triangle.name} (Color: ${triangle.color}) Area: ${triangle.calculateArea()}`,
);

// Створіть класи Circle, Rectangle, Square і Triangle. У кожного з них є загальнодоступний метод calculateArea. У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі
