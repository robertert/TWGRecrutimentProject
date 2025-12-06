import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../../../../constants/colors";
import { useNotesStore } from "../../../../../store/notesStore";
import { useVideoStore } from "../../../../../store/videoStore";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { formatTime } from "../../../../../utils/functions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotesScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { id } = useLocalSearchParams();
  const { currentTime } = useVideoStore();
  const { addNoteWithProgress, getNotesByVideoId } = useNotesStore();
  const [noteContent, setNoteContent] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const videoNotes = getNotesByVideoId(id as string);

  const videoRef = useVideoStore((state) => state.videoRef);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const setCurrentTime = (time: number) => {
    if (videoRef) {
      videoRef.current?.seek(time);
    }
  };

  const handleAddNote = () => {
    if (noteContent.trim()) {
      addNoteWithProgress(noteContent.trim(), id as string, currentTime);
      setNoteContent("");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View
        style={[styles.container, { paddingBottom: safeAreaInsets.bottom }]}
      >
        {keyboardHeight == 0 && (
          <ScrollView
            style={[
              styles.notesList,
              { marginBottom: keyboardHeight > 0 ? keyboardHeight + 20 : 0 },
            ]}
            contentContainerStyle={styles.notesListContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {videoNotes.length === 0 ? (
              <Text style={styles.emptyText}>
                No notes yet. Add your first note!
              </Text>
            ) : (
              videoNotes.map((note) => (
                <Pressable
                  key={note.id}
                  onPress={() => {
                    setCurrentTime(note.timestamp);
                  }}
                >
                  <View style={styles.noteItem}>
                    <Text style={styles.noteTimestamp}>
                      {formatTime(note.timestamp)}
                    </Text>
                    <Text style={styles.noteContent}>{note.content}</Text>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        )}
        <View
          style={[
            styles.inputContainer,
            { marginTop: keyboardHeight > 0 ? 5 : 0 },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter notes..."
            value={noteContent}
            onChangeText={setNoteContent}
            multiline
            placeholderTextColor={Colors.primary500}
          />
          <Pressable
            onPress={handleAddNote}
            style={[styles.addButton]}
            disabled={!noteContent.trim()}
          >
            <Text style={styles.addButtonText}>Add Note</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 12,
    padding: 12,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
    height: 60,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: Colors.primary700,
    height: 40,
    width: 256,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "center",
  },
  addButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Colors.primary100,
  },
  notesList: {
    flex: 1,
  },
  notesListContent: {
    padding: 16,
  },
  noteItem: {
    backgroundColor: Colors.primary100,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 12,
    marginBottom: 12,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  noteTimestamp: {
    position: "absolute",
    bottom: 6,
    right: 10,
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    color: Colors.primary700,
  },
  noteContent: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: Colors.primary700,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.primary500,
    textAlign: "center",
    marginTop: 40,
  },
});
