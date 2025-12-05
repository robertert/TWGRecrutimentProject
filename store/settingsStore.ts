import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
  learningRemindersEnabled: boolean;
  reminderTime: string;
  setLearningRemindersEnabled: (enabled: boolean) => void;
  setReminderTime: (time: Date) => void;
  getReminderTimeAsDate: () => Date;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => {
      const defaultTime = new Date();
      defaultTime.setHours(10, 0, 0, 0);
      const defaultTimeISO = defaultTime.toISOString();

      return {
        learningRemindersEnabled: true,
        reminderTime: defaultTimeISO,
        setLearningRemindersEnabled: (enabled: boolean) => {
          try {
            set({ learningRemindersEnabled: enabled });
          } catch (error) {
            console.error(
              "Błąd podczas zapisywania ustawień przypomnień:",
              error
            );
          }
        },
        setReminderTime: (time: Date) => {
          try {
            set({ reminderTime: time.toISOString() });
          } catch (error) {
            console.error(
              "Błąd podczas zapisywania czasu przypomnienia:",
              error
            );
          }
        },
        getReminderTimeAsDate: () => {
          try {
            const timeString = get().reminderTime;
            const date = new Date(timeString);
            if (isNaN(date.getTime())) {
              const defaultTime = new Date();
              defaultTime.setHours(10, 0, 0, 0);
              return defaultTime;
            }
            return date;
          } catch (error) {
            console.error(
              "Błąd podczas odczytywania czasu przypomnienia:",
              error
            );
            const defaultTime = new Date();
            defaultTime.setHours(10, 0, 0, 0);
            return defaultTime;
          }
        },
      };
    },
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Błąd podczas wczytywania ustawień z pamięci:", error);
        }
      },
    }
  )
);
