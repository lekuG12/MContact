import { useLocalSearchParams } from "expo-router";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import styles from "../styles/ConStyles";

function formatPhoneForCall(phone: string) {
  return phone.replace(/[^0-9+]/g, "");
}

export default function Contact() {
  const params = useLocalSearchParams();

  const { name, phone } = params;

  const nameStr = Array.isArray(name) ? name[0] : name || "unknown";
  const phoneStr = Array.isArray(phone) ? phone[0] : phone || "unknown";

  const handleCall = async () => {
    const phoneNumber = formatPhoneForCall(phone as string);
    const url = `tel:${phoneNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to make phone calls on this device");
      }
    } catch (error: any) {
      Alert.alert("Error", `Failed to open dialer: ${error.message}`);
    }
  };

  const handleText = async () => {
    const phoneNumber = formatPhoneForCall(phone as string);
    const url = `sms:${phoneNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to send messages on this device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open messaging app");
    }
  };

  const handleTelegram = async () => {
    let phoneNumber = formatPhoneForCall(phone as string);
    const url = `tg://resolve?phone=${phoneNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Telegram Not Found",
          "Telegram is not installed on this device. Would you like to install it?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Install",
              onPress: () => {
                const storeUrl =
                  Platform.OS === "ios"
                    ? "https://apps.apple.com/app/telegram-messenger/id686449807"
                    : "https://play.google.com/store/apps/details?id=org.telegram.messenger";
                Linking.openURL(storeUrl);
              },
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open Telegram");
      console.error("Telegram error:", error);
    }
  };

  const handleWhatsApp = async () => {
    let phoneNumber = formatPhoneForCall(phone as string);

    const url = `whatsapp://send?phone=${phoneNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "WhatsApp Not Found",
          "WhatsApp is not installed on this device. Would you like to install it?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Install",
              onPress: () => {
                const storeUrl =
                  Platform.OS === "ios"
                    ? "https://apps.apple.com/app/whatsapp-messenger/id310633997"
                    : "https://play.google.com/store/apps/details?id=com.whatsapp";
                Linking.openURL(storeUrl);
              },
            },
          ],
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open WhatsApp");
      console.error("WhatsApp error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {nameStr.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{nameStr}</Text>
        <Text style={styles.phone}>{phoneStr}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable
          style={[styles.actionButton, styles.callButton]}
          onPress={handleCall}
        >
          <Text style={styles.actionIcon}>📞</Text>
          <Text style={styles.actionText}>Call</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.textButton]}
          onPress={handleText}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>Text</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.whatsappButton]}
          onPress={handleWhatsApp}
        >
          <Text style={styles.actionIcon}>📱</Text>
          <Text style={styles.actionText}>WhatsApp</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.telegramButton]}
          onPress={handleTelegram}
        >
          <Text style={styles.actionIcon}>➢</Text>
          <Text style={styles.actionText}>Telegram</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
