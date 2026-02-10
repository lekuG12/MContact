import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { supabase } from "../lib/supabase";

import styles from "../styles/AddStyles";

declare global {
  var addContact: (name: string, phone: string) => Promise<void>;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export default function Index() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query)
    );
  });

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("Error fetching contacts: " + error.message);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (name: string, phone: string) => {
    try {
      if (name.length > 0 && phone.length > 0) {
        const { data, error } = await supabase
          .from("contacts")
          .insert([{ name: name, phone: phone }])
          .select();

        if (error) {
          alert("Failed to add contact");
        } else {
          setContacts((prevContacts) => [data[0], ...prevContacts]);
        }
      }
    } catch (error) {
      alert("Failed to add contact");
    }
  };

  const deleteContactHandler = async (id: string) => {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);

      if (error) {
        alert("Failed to delete contact");
      } else {
        setContacts((prevContacts) => {
          return prevContacts.filter((contact) => contact.id !== id);
        });
      }
    } catch (error) {
      alert("Failed to delete contact");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchContacts();
  };

  global.addContact = addContact;

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Contacts"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.contactItem}
            onPress={() =>
              router.push({
                pathname: "/contact",
                params: {
                  id: item.id,
                  name: item.name,
                  phone: item.phone,
                },
              })
            }
            onLongPress={() => deleteContactHandler(item.id)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.phone}</Text>
          </Pressable>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts yet. Add one below!</Text>
        }
      />
      <Pressable style={styles.addButton} onPress={() => router.push("/add")}>
        <Text style={styles.addText}>Add Contact</Text>
      </Pressable>
    </ScrollView>
  );
}
