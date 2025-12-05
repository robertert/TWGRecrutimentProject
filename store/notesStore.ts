import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteItem } from "../types/types";
import { logger } from "../utils/logger";

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
      setNotes: (notes: NoteItem[]) => {
        try {
          set({ notes });
        } catch (error) {
          logger.error("Błąd podczas zapisywania notatek:", error);
        }
      },
      addNote: (note: NoteItem) => {
        try {
          set((state) => ({ notes: [...(state.notes || []), note] }));
        } catch (error) {
          logger.error("Błąd podczas dodawania notatki:", error);
        }
      },
      addNoteWithProgress: (
        content: string,
        videoId: string,
        currentTime: number
      ) => {
        try {
          const newNote: NoteItem = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            content,
            timestamp: currentTime,
            videoId,
          };
          set((state) => ({ notes: [...(state.notes || []), newNote] }));
        } catch (error) {
          logger.error("Błąd podczas dodawania notatki z postępem:", error);
        }
      },
      deleteNote: (id: string) => {
        try {
          set((state) => ({
            notes: state.notes?.filter((note) => note.id !== id) || [],
          }));
        } catch (error) {
          logger.error("Błąd podczas usuwania notatki:", error);
        }
      },
      getNotesByVideoId: (videoId: string) => {
        try {
          return get().notes.filter((note) => note.videoId === videoId);
        } catch (error) {
          logger.error("Błąd podczas pobierania notatek:", error);
          return [];
        }
      },
      resetNotes: () => {
        try {
          set({ notes: [] });
        } catch (error) {
          logger.error("Błąd podczas resetowania notatek:", error);
        }
      },
    }),
    {
      name: "notes-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          logger.error("Błąd podczas wczytywania notatek z pamięci:", error);
        }
      },
    }
  )
);
