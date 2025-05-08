import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

type Status = 'pending' | 'done';

abstract class Note {
  static idCounter = 1;
  readonly id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;

  constructor(title: string, content: string) {
    if (!title.trim() || !content.trim()) {
      throw new Error('Note title and content cannot be empty.');
    }

    this.id = Note.idCounter++;
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = 'pending';
  }

  edit(title: string, content: string): void {
    if (!title.trim() || !content.trim()) return;
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }

  markAsDone(): void {
    this.status = 'done';
    this.updatedAt = new Date();
  }

  getInfo(): string {
    return `ID: ${this.id}\nTitle: ${this.title}\nContent: ${this.content}\nCreated: ${this.createdAt}\nUpdated: ${this.updatedAt}\nStatus: ${this.status}`;
  }
}

class TodoList {
  private notes: Note[] = [];

  addNote(note: Note): void {
    this.notes.push(note);
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  getNoteById(id: number): string | undefined {
    const note = this.notes.find((n) => n.id === id);
    return note?.getInfo();
  }

  getAllNotes(): Note[] {
    return this.notes;
  }

  getTotalCount(): number {
    return this.notes.length;
  }

  getPendingCount(): number {
    return this.notes.filter((n) => n.status === 'pending').length;
  }
}

// This class handles confirmation separately from the Note logic
class ConfirmingEditor {
  static isCI = process.env.CI === 'true'; // GitHub Actions sets this to true

  static async editWithConfirmation(
    note: Note,
    newTitle: string,
    newContent: string,
  ): Promise<void> {
    if (!newTitle.trim() || !newContent.trim()) return;

    if (this.isCI) {
      // Automatically confirm in CI environments
      note.edit(newTitle, newContent);
      return;
    }

    const rl = readline.createInterface({ input, output });
    const answer = await new Promise<string>((resolve) => {
      rl.question(
        `Are you sure you want to edit Note ID ${note.id}? (y/n): `,
        resolve,
      );
    });
    rl.close();

    if (answer.toLowerCase() === 'y') {
      note.edit(newTitle, newContent);
    }
  }
}

// Test scenarios
(async () => {
  const list = new TodoList();

  const note1 = new (class extends Note {})(
    'Buy Milk',
    'Remember to buy milk today.',
  );
  const note2 = new (class extends Note {})(
    'Project',
    'Finish TypeScript project.',
  );

  list.addNote(note1);
  list.addNote(note2);

  note1.markAsDone();

  await ConfirmingEditor.editWithConfirmation(
    note2,
    'Updated Project',
    'New project content.',
  );

  list.deleteNote(999); // Should silently fail

  console.log('All Notes:', list.getAllNotes());
  console.log('Pending:', list.getPendingCount());
})();
