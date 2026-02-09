import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function Contact() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {id, name, phone} = params;

  const handleCall = async() => {
    const phoneNumber = phone.replace(/[^0-9+]/g, '');
    const url = `tel:${phoneNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to make phone calls on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open phone app');
      console.error('Call error:', error);
    }
  };

  const handleText = async () => {
    const phoneNumber = phone.replace(/[^0-9+]/g, '');
    const url = `sms:${phoneNumber}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to send messages on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open messaging app');
      console.error('SMS error:', error);
    }
  };

  const handleTelegram = async () => {
    let phoneNumber = phone.replace(/[^0-9+]/g, '');
    const url = `https://t.me/${phoneNumber}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen){
        await Linking.openURL(url);
      }
      else{
        Alert.alert(
          'Telegram Not Found',
          'Telegram is not installed on this device. Would you like to install it?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Install',
              onPress: () => {
                const storeUrl = Platform.OS === 'ios' 
                  ? 'https://apps.apple.com/app/telegram-messenger/id686449807'
                  : 'https://play.google.com/store/apps/details?id=org.telegram.messenger';
                Linking.openURL(storeUrl);
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open Telegram');
      console.error('Telegram error:', error);
    }
  };


  const handleWhatsApp = async () => {
    let phoneNumber = phone.replace(/[^0-9+]/g, '');

    if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.substring(1);
    }
    if (phoneNumber.startsWith('00')) {
      phoneNumber = phoneNumber.substring(2);
    }
    
    const url = `whatsapp://send?phone=${phoneNumber}`;

      try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'WhatsApp Not Found',
          'WhatsApp is not installed on this device. Would you like to install it?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Install',
              onPress: () => {
                const storeUrl = Platform.OS === 'ios' 
                  ? 'https://apps.apple.com/app/whatsapp-messenger/id310633997'
                  : 'https://play.google.com/store/apps/details?id=com.whatsapp';
                Linking.openURL(storeUrl);
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open WhatsApp');
      console.error('WhatsApp error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
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
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back to Contacts</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phone: {
    fontSize: 18,
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 40,
    gap: 16,
  },
  actionButton: {
    width: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  callButton: {
    backgroundColor: '#34C759',
  },
  textButton: {
    backgroundColor: '#007AFF',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  emailButton: {
    backgroundColor: '#FF9500',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 'auto',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});