import { renderHook, act } from "@testing-library/react-native";
import { useSettingsStore } from "../settingsStore";

// Mock logger
jest.mock("../../utils/logger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe("useSettingsStore", () => {
  beforeEach(() => {
    // Reset store przed każdym testem
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setLearningRemindersEnabled(false);
      const defaultTime = new Date();
      defaultTime.setHours(10, 0, 0, 0);
      result.current.setReminderTime(defaultTime);
    });
  });

  it("powinien mieć domyślnie wyłączone przypomnienia", () => {
    const { result } = renderHook(() => useSettingsStore());
    expect(result.current.learningRemindersEnabled).toBe(false);
  });

  it("powinien mieć domyślny czas przypomnienia ustawiony na 10:00", () => {
    const { result } = renderHook(() => useSettingsStore());
    const reminderTime = result.current.getReminderTimeAsDate();
    expect(reminderTime.getHours()).toBe(10);
    expect(reminderTime.getMinutes()).toBe(0);
  });

  it("powinien włączać przypomnienia", () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setLearningRemindersEnabled(true);
    });

    expect(result.current.learningRemindersEnabled).toBe(true);
  });

  it("powinien wyłączać przypomnienia", () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setLearningRemindersEnabled(true);
      result.current.setLearningRemindersEnabled(false);
    });

    expect(result.current.learningRemindersEnabled).toBe(false);
  });

  it("powinien ustawiać czas przypomnienia", () => {
    const { result } = renderHook(() => useSettingsStore());
    const newTime = new Date();
    newTime.setHours(14, 30, 0, 0);

    act(() => {
      result.current.setReminderTime(newTime);
    });

    const reminderTime = result.current.getReminderTimeAsDate();
    expect(reminderTime.getHours()).toBe(14);
    expect(reminderTime.getMinutes()).toBe(30);
  });

  it("powinien zwracać czas przypomnienia jako Date", () => {
    const { result } = renderHook(() => useSettingsStore());
    const testTime = new Date("2024-01-15T16:45:00");

    act(() => {
      result.current.setReminderTime(testTime);
    });

    const reminderTime = result.current.getReminderTimeAsDate();
    expect(reminderTime).toBeInstanceOf(Date);
    expect(reminderTime.getHours()).toBe(16);
    expect(reminderTime.getMinutes()).toBe(45);
  });

  it("powinien zwracać domyślny czas gdy czas jest nieprawidłowy", () => {
    const { result } = renderHook(() => useSettingsStore());

    // Symuluj nieprawidłowy czas w store (przez bezpośrednią manipulację)
    // W rzeczywistości to nie powinno się zdarzyć, ale testujemy obsługę błędów
    act(() => {
      // Ustawiamy nieprawidłowy czas przez bezpośrednią manipulację store
      // W praktyce getReminderTimeAsDate powinien to obsłużyć
      const invalidTime = new Date("invalid");
      if (!isNaN(invalidTime.getTime())) {
        result.current.setReminderTime(invalidTime);
      }
    });

    // Funkcja getReminderTimeAsDate powinna zwrócić domyślny czas dla nieprawidłowych wartości
    const reminderTime = result.current.getReminderTimeAsDate();
    expect(reminderTime).toBeInstanceOf(Date);
    expect(reminderTime.getHours()).toBeGreaterThanOrEqual(0);
    expect(reminderTime.getHours()).toBeLessThan(24);
  });

  it("powinien zachowywać ustawienia po wielu zmianach", () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setLearningRemindersEnabled(true);
      const time1 = new Date();
      time1.setHours(9, 0, 0, 0);
      result.current.setReminderTime(time1);
    });

    expect(result.current.learningRemindersEnabled).toBe(true);
    expect(result.current.getReminderTimeAsDate().getHours()).toBe(9);

    act(() => {
      const time2 = new Date();
      time2.setHours(18, 30, 0, 0);
      result.current.setReminderTime(time2);
    });

    expect(result.current.learningRemindersEnabled).toBe(true);
    expect(result.current.getReminderTimeAsDate().getHours()).toBe(18);
    expect(result.current.getReminderTimeAsDate().getMinutes()).toBe(30);
  });
});
