class School {
  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter((area) => area.name !== areaName);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturerName: string): void {
    this._lecturers = this._lecturers.filter(
      (lecturer) =>
        `${lecturer.firstName} ${lecturer.lastName}` !== lecturerName,
    );
  }
}

class Area {
  private _levels: Level[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelName: string): void {
    this._levels = this._levels.filter((level) => level.name !== levelName);
  }
}

class Level {
  private _groups: Group[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(groupName: string): void {
    this._groups = this._groups.filter(
      (group) => group.levelName !== groupName,
    );
  }
}

class Group {
  private _status: string = '';
  private _students: Student[] = [];
  private _directionName: string;
  private _levelName: string;

  constructor(directionName: string, levelName: string) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(studentFullName: string): void {
    this._students = this._students.filter(
      (student) => student.fullName !== studentFullName,
    );
  }

  showPerformance(): Student[] {
    return [...this._students].sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating(),
    );
  }
}

class Student {
  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: { [workName: string]: number } = {};
  private _visits: { [lesson: string]: boolean } = {};

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  get grades(): { [workName: string]: number } {
    return this._grades;
  }

  get visits(): { [lesson: string]: boolean } {
    return this._visits;
  }

  set grade({ workName, grade }: { workName: string; grade: number }) {
    this._grades[workName] = grade;
  }

  set visit({ lesson, present }: { lesson: string; present: boolean }) {
    this._visits[lesson] = present;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);
    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (Object.values(this._visits).filter((present) => present).length /
        Object.values(this._visits).length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

interface Lecturer {
  firstName: string;
  lastName: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
}

// Тестирование

const school = new School();

// Создание областей
const area1 = new Area('Mathematics');
const area2 = new Area('Physics');

school.addArea(area1);
school.addArea(area2);
console.log('School Areas:', school.areas);

school.removeArea('Physics');
console.log('School Areas after removal:', school.areas);

// Добавление уровней
const level1 = new Level('Beginner', 'Introductory level');
const level2 = new Level('Advanced', 'For advanced students');

area1.addLevel(level1);
area1.addLevel(level2);
console.log('Mathematics Area Levels:', area1.levels);

area1.removeLevel('Beginner');
console.log('Mathematics Area Levels after removal:', area1.levels);

// Добавление преподавателя
const lecturer1: Lecturer = {
  firstName: 'John',
  lastName: 'Doe',
  position: 'Professor',
  company: 'University A',
  experience: 10,
  courses: ['Calculus', 'Algebra'],
  contacts: ['john.doe@email.com'],
};

school.addLecturer(lecturer1);
console.log('School Lecturers:', school.lecturers);

school.removeLecturer('John Doe');
console.log('School Lecturers after removal:', school.lecturers);

// Создание группы
const group = new Group('Mathematics', 'Beginner');
group.status = 'Active';
console.log('Group Status:', group.status);

// Создание студентов
const student1 = new Student('Alice', 'Smith', 2000);
const student2 = new Student('Bob', 'Johnson', 2001);

student1.grade = { workName: 'Homework 1', grade: 90 };
student1.grade = { workName: 'Homework 2', grade: 85 };
student1.visit = { lesson: 'Lesson 1', present: true };
student1.visit = { lesson: 'Lesson 2', present: false };

student2.grade = { workName: 'Homework 1', grade: 95 };
student2.grade = { workName: 'Homework 2', grade: 80 };
student2.visit = { lesson: 'Lesson 1', present: true };
student2.visit = { lesson: 'Lesson 2', present: true };

group.addStudent(student1);
group.addStudent(student2);
console.log('Group Students:', group.students);

console.log('Performance of students (sorted):', group.showPerformance());

group.removeStudent('Alice Smith');
console.log('Group Students after removal:', group.students);

console.log('Age of Bob:', student2.age);
