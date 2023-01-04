export type NoteT = {
  id: string;
  title: string;
  detail?: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};
export type NoteEditDataT = Pick<NoteT, "id" | "title" | "detail">;
export type NoteStoreT = Record<"notes", NoteT[]>;
