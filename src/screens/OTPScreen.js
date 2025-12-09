// src/screens/OTPScreen.js
import React, { useState, useEffect } from "react";
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
import InputField from "../components/InputField";
import { supabase } from "../lib/supabase";

export default function OTPScreen({ route, navigation }) {
  const { phone, email, fname, lname } = route.params || {};
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!phone) navigation.goBack();
  }, [phone]);

  const handleVerify = async () => {
    if (!/^[0-9]{4,6}$/.test(code.trim())) {
      Alert.alert("Invalid code", "Enter the code you received by SMS.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code.trim(),
      type: "sms",
    });
    setLoading(false);

    if (error) {
      console.error("verifyOtp error", error);
      Alert.alert("Verification failed", error.message || "Invalid code");
      return;
    }

    // Successful verify: go to create password screen
    navigation.replace("CreatePassword", { phone, email, fname, lname });
  };

  const handleResend = async () => {
    setResendLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setResendLoading(false);
    if (error) {
      Alert.alert("Resend failed", error.message || "Could not resend OTP");
    } else {
      Alert.alert("OTP Sent", "We resent the code to your phone.");
    }
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
              <Text style={styles.title}>Enter the OTP</Text>
              <Text style={styles.subtitle}>We sent a code to {phone}</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.otpInput}
                placeholder="123456"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={code}
                onChangeText={setCode}
                maxLength={6}
              />

              <TouchableOpacity disabled={loading} onPress={handleVerify} style={styles.submitBtn}>
                <LinearGradient colors={["#FF6B35", "#F7931E"]} style={styles.submitGradient}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Verify</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleResend} style={styles.link}>
                {resendLoading ? <ActivityIndicator /> : <Text style={styles.linkText}>Resend code</Text>}
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
  subtitle: { color: "#a8b2c1", marginTop: 10, fontSize: 14 },
  form: { width: "100%", marginTop: 20, alignItems: "center" },
  otpInput: {
    width: "60%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  submitBtn: { width: "100%", overflow: "hidden", borderRadius: 12, marginBottom: 12 },
  submitGradient: { height: 56, justifyContent: "center", alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { marginTop: 12 },
  linkText: { color: "#FF6B35", fontWeight: "600" },
});
