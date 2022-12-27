export type NoteT = {
  id: string;
  title: string;
  detail?: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NotesDataT = Record<"notes", NoteT[]>