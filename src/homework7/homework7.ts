import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

type Status = 'pending' | 'done';

class Note {
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
    if (title.trim() && content.trim()) {
      this.title = title;
      this.content = content;
      this.updatedAt = new Date();
    }
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
  protected notes: Note[] = [];

  addNote(note: Note): void {
    this.notes.push(note);
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  editNote(id: number, title: string, content: string): void {
    const note = this.notes.find((n) => n.id === id);
    if (note) {
      note.edit(title, content);
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
}

class SearchableTodoList extends TodoList {
  searchNotes(term: string): Note[] {
    const lower = term.toLowerCase();
    return this.notes.filter(
      (n) =>
        n.title.toLowerCase().includes(lower) ||
        n.content.toLowerCase().includes(lower),
    );
  }
}

class SortableTodoList extends TodoList {
  sortByStatus(): Note[] {
    return [...this.notes].sort((a, b) => a.status.localeCompare(b.status));
  }

  sortByCreatedTime(): Note[] {
    return [...this.notes].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }
}

// ✅ Test
function main() {
  const list = new SearchableTodoList(); // Can also test SortableTodoList
  const note1 = new Note('Buy Milk', 'Remember to buy milk today.');
  const note2 = new Note('Project', 'Finish TypeScript project.');

  list.addNote(note1);
  list.addNote(note2);

  note1.markAsDone();
  list.editNote(note2.id, 'Updated Project', 'New project content.');
  list.deleteNote(999); // No error if not found

  console.log('All Notes:', list.getAllNotes());
  console.log('Pending Count:', list.getPendingCount());
  console.log(
    "Search 'milk':",
    list.searchNotes('milk').map((n) => n.title),
  );
}

main();
