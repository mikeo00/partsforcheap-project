// src/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import InputField from "../components/InputField";
import { supabase } from "../lib/supabase";

export default function RegisterScreen({ navigation }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!/^[A-Za-z]{2,}$/.test(fname.trim())) {
      Alert.alert("Invalid First Name", "Enter a valid first name (letters only).");
      return false;
    }
    if (!/^[A-Za-z]{2,}$/.test(lname.trim())) {
      Alert.alert("Invalid Last Name", "Enter a valid last name (letters only).");
      return false;
    }
    if (!/^\+?[0-9]{8,15}$/.test(phone.trim())) {
      Alert.alert("Invalid Phone", "Enter a valid phone number with country code.");
      return false;
    }
    if (email.trim().length > 0 && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim())) {
      Alert.alert("Invalid Email", "Enter a valid email or leave it empty.");
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validate()) return;

    setLoading(true);
    const phoneTrim = phone.trim();

    // Trigger real SMS OTP via Supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneTrim,
    });

    setLoading(false);

    if (error) {
      console.error("signInWithOtp error", error);
      Alert.alert("OTP Error", error.message || "Failed to send OTP.");
      return;
    }

    // Navigate to OTP screen with all necessary data
    navigation.navigate("OTP", {
      phone: phoneTrim,
      email: email.trim(),
      fname: fname.trim(),
      lname: lname.trim(),
    });
  };

  // Social sign in placeholders (works only after you configure OAuth URLs in Supabase)
  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
      // In Expo/mobile you should handle redirects — this call typically opens the browser.
    } catch (err) {
      console.error(err);
      Alert.alert("Google Sign-in failed");
    }
  };

  const handleFacebook = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "facebook" });
    } catch (err) {
      console.error(err);
      Alert.alert("Facebook Sign-in failed");
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

              <Image source={require("../../assets/PARTS_FOR_CHEAP-removebg-preview.png")} style={styles.logo} resizeMode="contain" />

              <Text style={styles.subtitle}>Create your account in CarsForCheap</Text>
            </View>

            <View style={styles.form}>
              <InputField icon="person-outline" placeholder="First Name" value={fname} onChangeText={setFname} autoCapitalize="words" />
              <InputField icon="person-outline" placeholder="Last Name" value={lname} onChangeText={setLname} autoCapitalize="words" />

              <InputField
                icon="call-outline"
                placeholder="Phone Number (include country code)"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                autoCapitalize="none"
              />

              <InputField icon="mail-outline" placeholder="Email (optional, notifications)" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />

              {/* Social Buttons (kept) */}
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogle}>
                <Ionicons name="logo-google" size={24} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleFacebook}>
                <Ionicons name="logo-facebook" size={24} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={loading} onPress={handleSendOtp} style={styles.RegBtn}>
                <LinearGradient colors={["#FF6B35", "#F7931E"]} style={styles.signUpGradient}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signUpText}>Continue</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.login}>
                <Text style={{ color: "#8e9aaf" }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signinLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
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
  logo: { width: 200, height: 120 },
  subtitle: { color: "#a8b2c1", marginTop: 10, fontSize: 16 },
  form: { width: "100%" },
  signUpGradient: { height: 56, justifyContent: "center", alignItems: "center", borderRadius: 12 },
  signUpText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  login: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  signinLink: { color: "#FF6B35", fontWeight: "bold", marginLeft: 5 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    height: 45,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  socialButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 12 },
});
