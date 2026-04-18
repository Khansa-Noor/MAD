import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  /* ===== Layout ===== */
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionSpacing: {
    marginTop: 25,
  },

  /* ===== Typography ===== */
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 25,
    letterSpacing: 0.8,
    textAlign: "center",
  },

  subText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 5,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },

  /* ===== Card ===== */
  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 18,
    marginBottom: 18,
    width: "100%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  /* ===== Button ===== */
  button: {
    backgroundColor: "#3f518c",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
    alignSelf: "center",

    shadowColor: "#3f518c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonDisabled: {
    backgroundColor: "#94a3b8",
    shadowOpacity: 0,
    elevation: 0,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  /* ===== Input ===== */
  input: {
    backgroundColor: "#f8fafc",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  inputFocused: {
    borderColor: "#3f518c",
  },
});
