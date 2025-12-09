// src/screens/CreatePasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../lib/supabase";

export default function CreatePasswordScreen({ route, navigation }) {
  const { phone, email, fname, lname } = route.params || {};
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?_ -]).{8,}$/.test(p);

  const handleCreate = async () => {
    if (password.length === 0 || confirm.length === 0) {
      Alert.alert("Error", "Fill both password fields.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Weak password", "Password must be 8+ chars, include upper/lower, number & special char.");
      return;
    }

    setLoading(true);
    // updateUser sets the password for the currently signed-in user (session from verifyOtp)
    const { data, error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setLoading(false);
      console.error("updateUser error", updateError);
      Alert.alert("Error", updateError.message || "Could not set password");
      return;
    }

    // Insert (or upsert) user profile into custom Users table
    try {
      const userId = data.user?.id || (await supabase.auth.getUser()).data.user?.id;
      await supabase
        .from("Users")
        .insert({
          user_id: userId,
          name: `${fname || ""} ${lname || ""}`.trim(),
          phone_number: phone,
          email: email || null,
        })
        .onConflict("user_id")
        .ignore();
    } catch (err) {
      console.warn("Could not insert profile row", err);
    }

    setLoading(false);
    Alert.alert("Success", "Account ready — welcome!");
    // Navigate to main app area
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient colors={["#1a1a2e", "#16213e", "#0f3460"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>Create a password</Text>
              <Text style={styles.subtitle}>Secure your account</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
              />

              <TouchableOpacity disabled={loading} onPress={handleCreate} style={styles.submitBtn}>
                <LinearGradient colors={["#FF6B35", "#F7931E"]} style={styles.submitGradient}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Create Password</Text>}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 30 },
  backButton: { position: "absolute", left: 0, top: 0, padding: 8 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  subtitle: { color: "#a8b2c1", marginTop: 6, fontSize: 14 },
  form: { width: "100%", marginTop: 20 },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  submitBtn: { overflow: "hidden", borderRadius: 12, marginTop: 8 },
  submitGradient: { height: 56, justifyContent: "center", alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
