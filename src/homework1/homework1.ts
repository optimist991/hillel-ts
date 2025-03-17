class School {
  directions: Direction[] = [];

  addDirection(direction: Direction): void {
    this.directions.push(direction);
  }
}

class Direction {
  levels: Level[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }
}

class Level {
  groups: Group[] = [];
  name: string;
  program: string;

  constructor(name: string, program: string) {
    this.name = name;
    this.program = program;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }
}

class Group {
  students: Student[] = [];
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  showPerformance(): Student[] {
    return this.students
      .slice()
      .sort(
        (a: Student, b: Student) =>
          b.getPerformanceRating() - a.getPerformanceRating(),
      );
  }
}

class Student {
  grades: Record<string, number> = {};
  attendance: boolean[] = [];
  firstName: string;
  lastName: string;
  birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this.grades);
    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) /
      gradeValues.length;

    const attendancePercentage: number =
      (this.attendance.filter((present: boolean) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

// === Test Code with Type Annotations in Output ===
const school: School = new School();
const scienceDirection: Direction = new Direction('Science');
const level1: Level = new Level('Level 1', 'Basic Science Program');
const groupA: Group = new Group('Science', 'Level 1');

const student1: Student = new Student('John', 'Doe', 2008);
const student2: Student = new Student('Jane', 'Smith', 2007);

student1.setGrade('Math', 90);
student1.setGrade('Physics', 85);
student1.markAttendance(true);
student1.markAttendance(true);
student1.markAttendance(false);

student2.setGrade('Math', 80);
student2.setGrade('Physics', 95);
student2.markAttendance(true);
student2.markAttendance(true);
student2.markAttendance(true);

groupA.addStudent(student1);
groupA.addStudent(student2);
level1.addGroup(groupA);
scienceDirection.addLevel(level1);
school.addDirection(scienceDirection);

// === Output with Explicit Type Annotations ===
console.log('School structure (School):', school);
console.log(
  'Performance rating sorted (Student[]):',
  groupA.showPerformance().map((student: Student) => ({
    fullName: student.fullName,
    age: student.age,
    performanceRating: student.getPerformanceRating(),
  })),
);
