import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import { Colors } from "../constants/colors";
import * as RadioGroupPrimitive from "@rn-primitives/radio-group";

interface FilterModalProps {
  visible: boolean;
  onClose: (confirm: boolean) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export default function FilterModal({
  visible,
  onClose,
  sortBy,
  setSortBy,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose.bind(null, false)}
    >
      <Pressable style={styles.overlay} onPress={onClose.bind(null, false)}>
        <View style={styles.modalContainer}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Sort records by:</Text>
              <View style={styles.sortByContainer}>
                <RadioGroupPrimitive.Root
                  value={sortBy}
                  onValueChange={setSortBy}
                  style={styles.sortByRoot}
                >
                  <View style={styles.sortByItem}>
                    <RadioGroupPrimitive.Item
                      value="Most popular"
                      aria-labelledby="most-popular-label"
                    >
                      <View style={styles.indicatorContainer}>
                        <RadioGroupPrimitive.Indicator
                          style={styles.indicator}
                        />
                      </View>
                    </RadioGroupPrimitive.Item>
                    <Text
                      nativeID="most-popular-label"
                      onPress={() => setSortBy("Most popular")}
                      style={styles.sortByItemText}
                    >
                      Most popular
                    </Text>
                  </View>
                  <View style={styles.sortByItem}>
                    <RadioGroupPrimitive.Item
                      value="Upload date: latest"
                      aria-labelledby="upload-date-latest-label"
                    >
                      <View style={styles.indicatorContainer}>
                        <RadioGroupPrimitive.Indicator
                          style={styles.indicator}
                        />
                      </View>
                    </RadioGroupPrimitive.Item>
                    <Text
                      nativeID="upload-date-latest-label"
                      onPress={() => setSortBy("Upload date: latest")}
                      style={styles.sortByItemText}
                    >
                      Upload date: latest
                    </Text>
                  </View>
                  <View style={styles.sortByItem}>
                    <RadioGroupPrimitive.Item
                      value="Upload date: oldest"
                      aria-labelledby="upload-date-oldest-label"
                    >
                      <View style={styles.indicatorContainer}>
                        <RadioGroupPrimitive.Indicator
                          style={styles.indicator}
                        />
                      </View>
                    </RadioGroupPrimitive.Item>
                    <Text
                      nativeID="upload-date-oldest-label"
                      onPress={() => setSortBy("Upload date: oldest")}
                      style={styles.sortByItemText}
                    >
                      Upload date: oldest
                    </Text>
                  </View>
                </RadioGroupPrimitive.Root>
              </View>
              <Pressable onPress={onClose.bind(null, true)}>
                <View style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 320,
    height: 400,
    backgroundColor: Colors.primary500,
    borderRadius: 24,
    paddingHorizontal: 24,
  },
  modalContent: {},
  title: {
    marginTop: 32,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.primary100,
  },
  sortByContainer: {
    marginTop: 16,
  },
  sortByItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sortByItemIcon: {
    width: 24,
    height: 24,
  },
  sortByItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.primary100,
  },

  sortByItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: Colors.primary700,
  },
  indicatorContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  sortByRoot: {
    marginTop: 12,
    gap: 24,
  },

  confirmButton: {
    marginTop: 120,
    backgroundColor: Colors.primary700,
    paddingVertical: 14,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  confirmButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    letterSpacing: 0.01,
    color: Colors.primary100,
  },
});
