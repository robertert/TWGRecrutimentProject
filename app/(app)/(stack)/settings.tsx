import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useState } from "react";

import { Colors } from "../../../constants/colors";
import ProfileInfo from "../../../components/ProfileInfo";
import AnimatedSwitch from "../../../components/AnimatedSwitch";
import TimePickerModal from "../../../components/TimePickerModal";

export default function Settings() {
  const [checked, setChecked] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [timeString, setTimeString] = useState("10:00");

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setHours(10, 0, 0, 0);
    return d;
  });

  const formatTime = (rawDate: Date) => {
    const hours = rawDate.getHours().toString().padStart(2, "0");
    const minutes = rawDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    setDate(selectedTime);
    setTimeString(formatTime(selectedTime));
    setShowTimePicker(false);
  };

  const handleTimeCancel = () => {
    setShowTimePicker(false);
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

          <AnimatedSwitch checked={checked} onCheckedChange={setChecked} />
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
