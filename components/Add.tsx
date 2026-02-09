import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const AddContact = () => {
  const router = useRouter();
  const [uname, setUname] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (uname.trim().length > 0 && phone.trim().length > 0) {
      if (global.addContact) {
        global.addContact(uname.trim(), phone.trim());
      }
      setUname("");
      setPhone("");
      router.back();
    } else {
      Alert.alert(
        'Missing Information', 
        'Please enter both name and phone number!',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput 
        style={styles.input} 
        value={uname} 
        onChangeText={setUname} 
        placeholder="Enter name"
      />
      <Text>Phone</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
      />
      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    justifyContent: "center",
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
});

export default AddContact;