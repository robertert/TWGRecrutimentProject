import { renderHook, act } from "@testing-library/react-native";
import { useNotesStore } from "../notesStore";
import { NoteItem } from "../../types/types";

// Mock logger
jest.mock("../../utils/logger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe("useNotesStore", () => {
  beforeEach(() => {
    // Reset store przed każdym testem
    const { result } = renderHook(() => useNotesStore());
    act(() => {
      result.current.resetNotes();
    });
  });

  it("powinien mieć pustą tablicę notatek na początku", () => {
    const { result } = renderHook(() => useNotesStore());
    expect(result.current.notes).toEqual([]);
  });

  it("powinien dodawać notatkę", () => {
    const { result } = renderHook(() => useNotesStore());
    const newNote: NoteItem = {
      id: "note1",
      content: "Test note",
      timestamp: 120,
      videoId: "video1",
    };

    act(() => {
      result.current.addNote(newNote);
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0]).toEqual(newNote);
  });

  it("powinien dodawać wiele notatek", () => {
    const { result } = renderHook(() => useNotesStore());
    const note1: NoteItem = {
      id: "note1",
      content: "Note 1",
      timestamp: 60,
      videoId: "video1",
    };
    const note2: NoteItem = {
      id: "note2",
      content: "Note 2",
      timestamp: 120,
      videoId: "video1",
    };

    act(() => {
      result.current.addNote(note1);
      result.current.addNote(note2);
    });

    expect(result.current.notes).toHaveLength(2);
  });

  it("powinien dodawać notatkę z postępem wideo", () => {
    const { result } = renderHook(() => useNotesStore());

    act(() => {
      result.current.addNoteWithProgress("Test content", "video1", 180);
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].content).toBe("Test content");
    expect(result.current.notes[0].videoId).toBe("video1");
    expect(result.current.notes[0].timestamp).toBe(180);
    expect(result.current.notes[0].id).toBeDefined();
  });

  it("powinien generować unikalne ID dla notatek z postępem", () => {
    const { result } = renderHook(() => useNotesStore());

    act(() => {
      result.current.addNoteWithProgress("Note 1", "video1", 60);
      result.current.addNoteWithProgress("Note 2", "video1", 120);
    });

    expect(result.current.notes).toHaveLength(2);
    expect(result.current.notes[0].id).not.toBe(result.current.notes[1].id);
  });

  it("powinien usuwać notatkę po ID", () => {
    const { result } = renderHook(() => useNotesStore());
    const note1: NoteItem = {
      id: "note1",
      content: "Note 1",
      timestamp: 60,
      videoId: "video1",
    };
    const note2: NoteItem = {
      id: "note2",
      content: "Note 2",
      timestamp: 120,
      videoId: "video1",
    };

    act(() => {
      result.current.addNote(note1);
      result.current.addNote(note2);
      result.current.deleteNote("note1");
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].id).toBe("note2");
  });

  it("powinien zwracać notatki dla konkretnego videoId", () => {
    const { result } = renderHook(() => useNotesStore());
    const note1: NoteItem = {
      id: "note1",
      content: "Note 1",
      timestamp: 60,
      videoId: "video1",
    };
    const note2: NoteItem = {
      id: "note2",
      content: "Note 2",
      timestamp: 120,
      videoId: "video2",
    };
    const note3: NoteItem = {
      id: "note3",
      content: "Note 3",
      timestamp: 180,
      videoId: "video1",
    };

    act(() => {
      result.current.addNote(note1);
      result.current.addNote(note2);
      result.current.addNote(note3);
    });

    const video1Notes = result.current.getNotesByVideoId("video1");
    expect(video1Notes).toHaveLength(2);
    expect(video1Notes.map((n: NoteItem) => n.id)).toEqual(["note1", "note3"]);

    const video2Notes = result.current.getNotesByVideoId("video2");
    expect(video2Notes).toHaveLength(1);
    expect(video2Notes[0].id).toBe("note2");
  });

  it("powinien zwracać pustą tablicę gdy nie ma notatek dla videoId", () => {
    const { result } = renderHook(() => useNotesStore());
    const notes = result.current.getNotesByVideoId("nonexistent");
    expect(notes).toEqual([]);
  });

  it("powinien ustawiać notatki bezpośrednio", () => {
    const { result } = renderHook(() => useNotesStore());
    const notes: NoteItem[] = [
      {
        id: "note1",
        content: "Note 1",
        timestamp: 60,
        videoId: "video1",
      },
      {
        id: "note2",
        content: "Note 2",
        timestamp: 120,
        videoId: "video1",
      },
    ];

    act(() => {
      result.current.setNotes(notes);
    });

    expect(result.current.notes).toEqual(notes);
  });

  it("powinien resetować notatki", () => {
    const { result } = renderHook(() => useNotesStore());
    const note: NoteItem = {
      id: "note1",
      content: "Note 1",
      timestamp: 60,
      videoId: "video1",
    };

    act(() => {
      result.current.addNote(note);
      result.current.resetNotes();
    });

    expect(result.current.notes).toEqual([]);
  });
});
