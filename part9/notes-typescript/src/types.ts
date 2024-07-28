export interface Note {
  id: number;
  content: string;
}

// Los tipos Omit y Pick en TypeScript son utility types que te permiten crear un nuevo tipo basado en un tipo existente, pero omitiendo o seleccionando algunas de las propiedades del tipo original.

// https://platzi.com/clases/2879-typescript-tipos-avanzados/47318-omit-pick-type/
export type NewNote = Omit<Note, "id">;

export enum NotesAppText {
  Remove = "Remove",
  Add = "Add",
}
