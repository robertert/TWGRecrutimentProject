import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../constants/colors";
import { useState, useEffect } from "react";

interface TimePickerModalProps {
  visible: boolean;
  initialTime: Date;
  onConfirm: (time: Date) => void;
  onCancel: () => void;
}

export default function TimePickerModal({
  visible,
  initialTime,
  onConfirm,
  onCancel,
}: TimePickerModalProps) {
  const [tempDate, setTempDate] = useState(initialTime);

  useEffect(() => {
    if (visible) {
      setTempDate(initialTime);
    }
  }, [visible, initialTime]);

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "dismissed") {
        onCancel();
        return;
      }
      if (event.type === "set" && selectedDate) {
        onConfirm(selectedDate);
      }
      return;
    }

    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleConfirm = () => {
    onConfirm(tempDate);
  };

  const handleCancel = () => {
    setTempDate(initialTime);
    onCancel();
  };

  if (Platform.OS === "android") {
    return (
      <>
        {visible && (
          <DateTimePicker
            value={initialTime}
            mode="time"
            display="spinner"
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <Pressable style={styles.modalOverlay} onPress={handleCancel}>
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <Pressable onPress={handleCancel} hitSlop={10}>
              <Text style={styles.cancelButton}>Anuluj</Text>
            </Pressable>

            <Text style={styles.modalTitle}>Wybierz czas</Text>

            <Pressable onPress={handleConfirm} hitSlop={10}>
              <Text style={styles.confirmButton}>Wybierz</Text>
            </Pressable>
          </View>

          <DateTimePicker
            value={tempDate}
            mode="time"
            display="spinner"
            onChange={onChange}
            style={styles.iosPicker}
            textColor="black"
            themeVariant="light"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.primary100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    backgroundColor: Colors.primary100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.primary700,
  },
  cancelButton: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.primary700,
  },
  confirmButton: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: Colors.primary700,
  },
  iosPicker: {
    alignSelf: "center",
    height: 200,
    width: "100%",
    backgroundColor: Colors.primary100,
  },
});
