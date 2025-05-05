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

  abstract edit(title: string, content: string): void | Promise<void>;

  markAsDone(): void {
    this.status = 'done';
    this.updatedAt = new Date();
  }

  getInfo(): string {
    return `ID: ${this.id}\nTitle: ${this.title}\nContent: ${this.content}\nCreated: ${this.createdAt}\nUpdated: ${this.updatedAt}\nStatus: ${this.status}`;
  }
}

class DefaultNote extends Note {
  edit(title: string, content: string): void {
    if (!title.trim() || !content.trim()) return;
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }
}

class ConfirmableNote extends Note {
  static autoConfirm: boolean = true; // Set to false for local testing

  async edit(title: string, content: string): Promise<void> {
    if (ConfirmableNote.autoConfirm) {
      if (title.trim() && content.trim()) {
        this.title = title;
        this.content = content;
        this.updatedAt = new Date();
      }
      return;
    }

    const rl = readline.createInterface({ input, output });
    const answer = await new Promise<string>((resolve) => {
      rl.question(
        `Are you sure you want to edit Note ID ${this.id}? (y/n): `,
        resolve,
      );
    });
    rl.close();

    if (answer.toLowerCase() === 'y' && title.trim() && content.trim()) {
      this.title = title;
      this.content = content;
      this.updatedAt = new Date();
    }
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

  async editNote(id: number, title: string, content: string): Promise<void> {
    const note = this.notes.find((n) => n.id === id);
    if (note) {
      await note.edit(title, content);
    }
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

  searchNotes(term: string): Note[] {
    const lower = term.toLowerCase();
    return this.notes.filter(
      (n) =>
        n.title.toLowerCase().includes(lower) ||
        n.content.toLowerCase().includes(lower),
    );
  }

  sortByStatus(): Note[] {
    return [...this.notes].sort((a, b) => a.status.localeCompare(b.status));
  }

  sortByCreatedTime(): Note[] {
    return [...this.notes].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }
}

// Main async function to test
async function main() {
  const list = new TodoList();

  const note1 = new DefaultNote('Buy Milk', 'Remember to buy milk today.');
  const note2 = new ConfirmableNote('Project', 'Finish TypeScript project.');

  list.addNote(note1);
  list.addNote(note2);

  note1.markAsDone();
  await list.editNote(note2.id, 'Updated Project', 'New project content.');
  list.deleteNote(999); // No error if not found

  console.log('All Notes:', list.getAllNotes());
  console.log('Pending:', list.getPendingCount());
  console.log("Search for 'milk':", list.searchNotes('milk'));
  console.log(
    'Sorted by status:',
    list.sortByStatus().map((n) => n.title),
  );
  console.log(
    'Sorted by time:',
    list.sortByCreatedTime().map((n) => n.title),
  );
}

main();
