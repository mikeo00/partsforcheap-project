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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Invalid Email", "Enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);

    // Sign up with Supabase - this will send an email confirmation
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          first_name: fname.trim(),
          last_name: lname.trim(),
        },
        emailRedirectTo: undefined, // We'll handle OTP verification in the app
      },
    });

    setLoading(false);

    if (error) {
      console.error("signUp error", error);
      Alert.alert("Registration Error", error.message || "Failed to register.");
      return;
    }

    // Navigate to OTP screen for email verification
    Alert.alert("Success", "A verification code has been sent to your email.");
    navigation.navigate("OTP", {
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

              <Text style={styles.subtitle}>Create your account in PartsForCheap</Text>
            </View>

            <View style={styles.form}>
              <InputField icon="person-outline" placeholder="First Name" value={fname} onChangeText={setFname} autoCapitalize="words" />
              <InputField icon="person-outline" placeholder="Last Name" value={lname} onChangeText={setLname} autoCapitalize="words" />

              <InputField
                icon="mail-outline"
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <InputField
                icon="lock-closed-outline"
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#8e9aaf"
                    />
                  </TouchableOpacity>
                }
              />

              <InputField
                icon="lock-closed-outline"
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#8e9aaf"
                    />
                  </TouchableOpacity>
                }
              />

              {/* Social Buttons (kept) */}
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogle}>
                <Ionicons name="logo-google" size={24} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleFacebook}>
                <Ionicons name="logo-facebook" size={24} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={loading} onPress={handleRegister} style={styles.RegBtn}>
                <LinearGradient colors={["#FF6B35", "#F7931E"]} style={styles.signUpGradient}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signUpText}>Sign Up</Text>}
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
