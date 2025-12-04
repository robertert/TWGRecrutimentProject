import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../../../../../constants/colors";

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text>Notes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});
