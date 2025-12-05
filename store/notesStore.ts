import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteItem } from "../types/types";

interface NotesState {
  notes: NoteItem[];
  setNotes: (notes: NoteItem[]) => void;
  addNote: (note: NoteItem) => void;
  addNoteWithProgress: (
    content: string,
    videoId: string,
    currentTime: number
  ) => void;
  deleteNote: (id: string) => void;
  getNotesByVideoId: (videoId: string) => NoteItem[];
  resetNotes: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      setNotes: (notes: NoteItem[]) => set({ notes }),
      addNote: (note: NoteItem) =>
        set((state) => ({ notes: [...(state.notes || []), note] })),
      addNoteWithProgress: (
        content: string,
        videoId: string,
        currentTime: number
      ) => {
        const newNote: NoteItem = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          content,
          timestamp: currentTime,
          videoId,
        };
        set((state) => ({ notes: [...(state.notes || []), newNote] }));
      },
      deleteNote: (id: string) =>
        set((state) => ({
          notes: state.notes?.filter((note) => note.id !== id) || [],
        })),
      getNotesByVideoId: (videoId: string) => {
        return get().notes.filter((note) => note.videoId === videoId);
      },
      resetNotes: () => set({ notes: [] }),
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
