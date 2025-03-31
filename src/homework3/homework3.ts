// Abstract clas for all shapes
abstract class Shape {
  abstract readonly name: string;
  abstract calculateArea(): number;

  constructor(public readonly color: string) {}
}

// Abstract class for shapes that can calculate square
abstract class PrintableShape extends Shape {
  abstract print(): void;
}

// Circle class extends Shape
class Circle extends Shape {
  readonly name: string = 'Circle';

  constructor(
    color: string,
    public readonly radius: number,
  ) {
    super(color);
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// Rectangle class extends PrintableShape
class Rectangle extends PrintableShape {
  readonly name: string = 'Rectangle';

  constructor(
    color: string,
    public readonly width: number,
    public readonly height: number,
  ) {
    super(color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  print(): void {
    console.log(
      `Area formula: width * height = ${this.width} * ${this.height}`,
    );
  }
}

// Square class extends PrintableShape
class Square extends PrintableShape {
  readonly name: string = 'Square';

  constructor(
    color: string,
    public readonly side: number,
  ) {
    super(color);
  }

  calculateArea(): number {
    return this.side ** 2;
  }

  print(): void {
    console.log(`Area formula: side * side = ${this.side} * ${this.side}`);
  }
}

// Triangle class extends Shape
class Triangle extends Shape {
  readonly name: string = 'Triangle';

  constructor(
    color: string,
    public readonly base: number,
    public readonly height: number,
  ) {
    super(color);
  }

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
