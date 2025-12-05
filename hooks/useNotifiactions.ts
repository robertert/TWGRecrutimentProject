import * as Notifications from "expo-notifications";
import { isSimulator } from "../constants/flags";
import { logger } from "../utils/logger";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  const requestPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        return newStatus === "granted";
      }
      return true;
    } catch (error) {
      logger.error("Błąd podczas sprawdzania uprawnień:", error);
      throw new Error("Nie udało się sprawdzić uprawnień do powiadomień.");
    }
  };

  const scheduleReminder = async (date: Date) => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        throw new Error(
          "Brak uprawnień do powiadomień. Włącz powiadomienia w ustawieniach aplikacji."
        );
      }

      await cancelReminder();

      const hour = date.getHours();
      const minute = date.getMinutes();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Czas na naukę! 📚",
          body: "Pamiętaj o swojej dzisiejszej sesji nauki.",
          sound: true,
        },
        trigger: {
          hour,
          minute,
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
        },
      });

      logger.log(`Zaplanowano powiadomienie na ${hour}:${minute}`);
    } catch (error) {
      logger.error("Błąd podczas planowania powiadomienia:", error);
      throw error;
    }
  };

  const cancelReminder = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      logger.log("Anulowano powiadomienia");
    } catch (error) {
      logger.error("Błąd podczas anulowania powiadomień:", error);
      throw new Error("Nie udało się anulować powiadomień.");
    }
  };

  return { scheduleReminder, cancelReminder };
}

/*
export function useNotifications() {
  const scheduleReminder = async (date: Date) => {
    if (isSimulator) {
      logger.log("Simulator detected, notifications will not be scheduled");
      return;
    }
    try {
      return Promise.resolve();
    } catch (error) {
      logger.error("Błąd podczas planowania powiadomienia:", error);
      throw error;
    }
  };

  const cancelReminder = async () => {
    if (isSimulator) {
      logger.log("Simulator detected, notifications will not be canceled");
      return;
    }
    try {
      return Promise.resolve();
    } catch (error) {
      logger.error("Błąd podczas anulowania powiadomień:", error);
      throw error;
    }
  };

  return { scheduleReminder, cancelReminder };
}
*/
