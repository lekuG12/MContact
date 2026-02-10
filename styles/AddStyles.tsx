import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    // justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 4,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  contactItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontWeight: "600" },
  addButton: {
    marginTop: 16,
    padding: 14,
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: 4,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
});

export default styles;
