import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ThemeContext } from "../context/ThemeContext";
import { Swipeable } from "react-native-gesture-handler";

export default function NotesScreen({ navigation }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { isDark, toggleTheme } = useContext(ThemeContext);
  const theme = isDark ? darkTheme : lightTheme;

  const loadNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("userId", "==", auth.currentUser.uid),
    );

    const snap = await getDocs(q);
    setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNote = async () => {
    if (!note.trim()) return;

    if (editingId) {
      const noteRef = doc(db, "notes", editingId);
      await updateDoc(noteRef, { text: note });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "notes"), {
        text: note,
        time: new Date(),
        userId: auth.currentUser.uid, // ✅ ADDED
      });
    }

    setNote("");
    loadNotes();
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    loadNotes();
  };

  const startEdit = (item) => {
    setNote(item.text);
    setEditingId(item.id);
  };

  const logout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Notes</Text>
      </View>

      {/* Instructions */}
      <View style={[styles.instructions, { backgroundColor: theme.card }]}>
        <Text style={[styles.instructionsText, { color: theme.text }]}>
          • Tap a note to edit it.
        </Text>
        <Text style={[styles.instructionsText, { color: theme.text }]}>
          • Swipe left on a note to delete.
        </Text>
        <Text style={[styles.instructionsText, { color: theme.text }]}>
          • Press "Save Note" to add or update a note.
        </Text>
      </View>

      {/* Input */}
      <TextInput
        placeholder="Write your note..."
        placeholderTextColor={theme.placeholder}
        value={note}
        onChangeText={setNote}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
        <Text style={styles.saveBtnText}>
          {editingId ? "Update Note" : "Save Note"}
        </Text>
      </TouchableOpacity>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
              style={[styles.noteCard, { backgroundColor: theme.card }]}
              onPress={() => startEdit(item)}
            >
              <Text style={[styles.noteText, { color: theme.text }]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  headerButtons: {
    flexDirection: "row",
  },

  themeBtn: {
    backgroundColor: "#334155",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 8,
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  headerBtnText: {
    color: "white",
    fontWeight: "600",
  },

  instructions: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  instructionsText: {
    fontSize: 13,
    marginBottom: 3,
  },

  input: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 15,
  },

  saveBtn: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  saveBtnText: {
    fontWeight: "bold",
    color: "#0f172a",
  },

  noteCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#d62121",
  },

  noteText: {
    fontSize: 15,
    textDecorationColor: "#ce8818",
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    borderRadius: 12,
    marginBottom: 10,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

const darkTheme = {
  background: "#0f172a",
  card: "#1e293b",
  text: "#ffffff",
  border: "#334155",
  placeholder: "#94a3b8",
};

const lightTheme = {
  background: "#f1f5f9",
  card: "#ffffff",
  text: "#0f172a",
  border: "#cbd5e1",
  placeholder: "#64748b",
};
