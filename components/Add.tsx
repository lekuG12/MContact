import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

import styles from "../styles/AddStyles";

const AddContact = () => {
  const router = useRouter();
  const [uname, setUname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

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
        "Missing Information",
        "Please enter both name and phone number!",
        [{ text: "OK" }],
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
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

export default AddContact;
