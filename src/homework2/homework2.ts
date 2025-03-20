class School {
  areas: Area[] = [];
  lecturers: Lecturer[] = [];

  addArea(area: Area): void {
    this.areas.push(area);
  }

  removeArea(areaName: string): void {
    this.areas = this.areas.filter(area => area.name !== areaName);
  }

  // Добавить преподавателя
  addLecturer(lecturer: Lecturer): void {
    this.lecturers.push(lecturer);
  }

  // Удалить преподавателя
  removeLecturer(lecturerName: string): void {
    this.lecturers = this.lecturers.filter(
      lecturer => `${lecturer.firstName} ${lecturer.lastName}` !== lecturerName
    );
  }
}

class Area {
  levels: Level[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Добавить уровень
  addLevel(level: Level): void {
    this.levels.push(level);
  }

  // Удалить уровень
  removeLevel(levelName: string): void {
    this.levels = this.levels.filter(level => level.name !== levelName);
  }
}

class Level {
  groups: Group[] = [];
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  // Добавить группу
  addGroup(group: Group): void {
    this.groups.push(group);
  }

  // Удалить группу
  removeGroup(groupName: string): void {
    this.groups = this.groups.filter(group => group.levelName !== groupName);
  }
}

class Group {
  area!: Area;
  status!: string;
  students: Student[] = [];

  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  // Добавить студента
  addStudent(student: Student): void {
    this.students.push(student);
  }

  // Удалить студента
  removeStudent(studentFullName: string): void {
    this.students = this.students.filter(
      student => student.fullName !== studentFullName
    );
  }

  // Установить статус группы
  setStatus(status: string): void {
    this.status = status;
  }

  // Отобразить успеваемость
  showPerformance(): Student[] {
    return this.students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
  }
}

class Student {
  firstName: string;
  lastName: string;
  birthYear: number;
  grades: { [workName: string]: number } = {};
  visits: { [lesson: string]: boolean } = {};

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  // Полное имя
  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(' ');
  }

  // Возраст
  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  // Установить оценку
  setGrade(workName: string, grade: number): void {
    this.grades[workName] = grade;
  }

  // Установить посещаемость
  setVisit(lesson: string, present: boolean): void {
    this.visits[lesson] = present;
  }

  // Оценка успеваемости
  getPerformanceRating(): number {
    const gradeValues = Object.values(this.grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (Object.values(this.visits).filter((present) => present).length / Object.values(this.visits).length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

// Определение типа преподавателя
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

// Создаем школу
const school = new School();

// Создаем области
const area1 = new Area('Mathematics');
const area2 = new Area('Physics');

// Добавляем области в школу
school.addArea(area1);
school.addArea(area2);
console.log('School Areas:', school.areas);

// Удаляем область
school.removeArea('Physics');
console.log('School Areas after removal:', school.areas);

// Создаем уровни для областей
const level1 = new Level('Beginner', 'Introductory level');
const level2 = new Level('Advanced', 'For advanced students');

// Добавляем уровни в области
area1.addLevel(level1);
area1.addLevel(level2);
console.log('Mathematics Area Levels:', area1.levels);

// Удаляем уровень
area1.removeLevel('Beginner');
console.log('Mathematics Area Levels after removal:', area1.levels);

// Создаем преподавателей
const lecturer1: Lecturer = {
  firstName: 'John',
  lastName: 'Doe',
  position: 'Professor',
  company: 'University A',
  experience: 10,
  courses: ['Calculus', 'Algebra'],
  contacts: ['john.doe@email.com'],
};

// Добавляем преподавателей в школу
school.addLecturer(lecturer1);
console.log('School Lecturers:', school.lecturers);

// Удаляем преподавателя
school.removeLecturer('John Doe');
console.log('School Lecturers after removal:', school.lecturers);

// Создаем группу
const group = new Group('Mathematics', 'Beginner');
group.setStatus('Active');
console.log('Group Status:', group.status);

// Добавляем студентов
const student1 = new Student('Alice', 'Smith', 2000);
const student2 = new Student('Bob', 'Johnson', 2001);

// Устанавливаем оценки и посещаемость
student1.setGrade('Homework 1', 90);
student1.setGrade('Homework 2', 85);
student1.setVisit('Lesson 1', true);
student1.setVisit('Lesson 2', false);

student2.setGrade('Homework 1', 95);
student2.setGrade('Homework 2', 80);
student2.setVisit('Lesson 1', true);
student2.setVisit('Lesson 2', true);

// Добавляем студентов в группу
group.addStudent(student1);
group.addStudent(student2);
console.log('Group Students:', group.students);

// Отображаем успеваемость студентов
console.log('Performance of students (sorted):', group.showPerformance());

// Удаляем студента
group.removeStudent('Alice Smith');
console.log('Group Students after removal:', group.students);

// Проверяем возраст студента
console.log('Age of Bob:', student2.age);
