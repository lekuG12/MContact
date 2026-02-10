import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  phone: {
    fontSize: 18,
    color: "#666",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 40,
    gap: 16,
  },
  actionButton: {
    width: "45%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  callButton: {
    backgroundColor: "#34C759",
  },
  textButton: {
    backgroundColor: "#007bff",
  },

  telegramButton: {
    backgroundColor: "#1d91ca",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
