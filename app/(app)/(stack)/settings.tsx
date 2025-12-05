import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useState, useEffect } from "react";

import { Colors } from "../../../constants/colors";
import ProfileInfo from "../../../components/ProfileInfo";
import AnimatedSwitch from "../../../components/AnimatedSwitch";
import TimePickerModal from "../../../components/TimePickerModal";
import { useNotifications } from "../../../hooks/useNotifiactions";
import { useSettingsStore } from "../../../store/settingsStore";
import { formatTimeDate } from "../../../utils/functions";
import { logger } from "../../../utils/logger";

export default function Settings() {
  const {
    learningRemindersEnabled,
    reminderTime,
    setLearningRemindersEnabled,
    setReminderTime,
    getReminderTimeAsDate,
  } = useSettingsStore();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(() => getReminderTimeAsDate());
  const [isLoading, setIsLoading] = useState(false);

  const { scheduleReminder, cancelReminder } = useNotifications();

  useEffect(() => {
    setDate(getReminderTimeAsDate());
  }, [reminderTime, getReminderTimeAsDate]);

  const timeString = formatTimeDate(date);

  const handleTimeConfirm = async (selectedTime: Date) => {
    setDate(selectedTime);
    setReminderTime(selectedTime);
    if (learningRemindersEnabled) {
      try {
        setIsLoading(true);
        await scheduleReminder(selectedTime);
      } catch (error) {
        Alert.alert(
          "Błąd",
          "Nie udało się ustawić przypomnienia. Sprawdź uprawnienia do powiadomień w ustawieniach aplikacji.",
          [{ text: "OK" }]
        );
        logger.error("Błąd podczas ustawiania przypomnienia:", error);
      } finally {
        setIsLoading(false);
      }
    }
    setShowTimePicker(false);
  };

  const handleTimeCancel = () => {
    setShowTimePicker(false);
  };

  const handleReminderChange = async (checked: boolean) => {
    const previousValue = learningRemindersEnabled;
    setLearningRemindersEnabled(checked);

    try {
      setIsLoading(true);
      if (checked) {
        await scheduleReminder(date);
      } else {
        await cancelReminder();
      }
    } catch (error) {
      Alert.alert(
        "Błąd",
        checked
          ? "Nie udało się włączyć przypomnień. Sprawdź uprawnienia do powiadomień w ustawieniach aplikacji."
          : "Nie udało się wyłączyć przypomnień.",
        [{ text: "OK" }]
      );
      logger.error("Błąd podczas zmiany przypomnień:", error);

      setLearningRemindersEnabled(previousValue);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/icons/leftarrow-icon.svg")}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ProfileInfo channelTitle="John Doe" alignSelf="center" />

      <View style={styles.settingsDivider} />

      {/* --- CONTENT --- */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingsItemInfo}>
          <Image
            source={require("../../../assets/icons/notification-icon.svg")}
            style={styles.settingsItemTitleIcon}
          />
          <Text style={styles.settingsItemTitle}>Learning reminders</Text>
        </View>

        <View style={styles.settingsItemContent}>
          <Text style={styles.settingsItemContentTitle}>
            Repeat every day at:{" "}
          </Text>

          <Pressable onPress={() => setShowTimePicker(true)}>
            <View style={styles.timePickerContainer}>
              <Image
                source={require("../../../assets/icons/clock-icon.svg")}
                style={styles.timePickerIcon}
              />
              <Text style={styles.settingsItemContentText}>{timeString}</Text>
            </View>
          </Pressable>

          <AnimatedSwitch
            checked={learningRemindersEnabled}
            onCheckedChange={handleReminderChange}
          />
        </View>

        <Text style={styles.settingsItemDescription}>
          You will receive a friendly reminder to remember to study.
        </Text>
      </View>

      <TimePickerModal
        visible={showTimePicker}
        initialTime={date}
        onConfirm={handleTimeConfirm}
        onCancel={handleTimeCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  header: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  backIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: Colors.primary700,
  },
  settingsDivider: {
    height: 2,
    backgroundColor: Colors.primary700,
    width: "100%",
    marginTop: 40,
    marginBottom: 8,
  },
  settingsContainer: {
    marginHorizontal: 28,
  },
  settingsItemInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },
  settingsItemTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.primary700,
  },
  settingsItemTitleIcon: {
    width: 36,
    height: 36,
  },
  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemContentTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
    marginRight: 32,
  },
  settingsItemContentText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 54,
  },
  timePickerIcon: {
    width: 24,
    height: 24,
  },
  settingsItemDescription: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    color: Colors.primary700,
    marginTop: 18,
  },
});
