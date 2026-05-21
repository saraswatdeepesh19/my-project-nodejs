import { Note } from "../entities/note.entity";

export class NoteRepository {
  private notes: Note[] = [];

  save(note: Note): string {
    this.notes.push(note);
    return "Note Saved";
  }

  findAll(): Note[] {
    return this.notes;
  }

  findById(id: string): Note | undefined {
    const noteById: Note | undefined = this.notes.find(
      (note) => note.id === id,
    );
    return noteById;
  }
}
