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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Login Failed", error.message);
    } else if (data.user) {
      Alert.alert("Welcome", `Hello ${data.user.email}`);
      // Navigate to main screen if needed
      // navigation.replace('Home');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            {/* Header / Logo */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <Image
                source={require("../../assets/PARTS_FOR_CHEAP-removebg-preview.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.subtitle}>
                Welcome back! Sign in to continue
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <InputField
                icon="mail-outline"
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
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

              <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 24 }}>
                <Text style={{ color: "#FF6B35" }}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Social login (mock) */}
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#fff" />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              {/* Login button */}
              <TouchableOpacity
                disabled={loading}
                onPress={handleLogin}
                style={styles.loginBtn}
              >
                <LinearGradient
                  colors={["#FF6B35", "#F7931E"]}
                  style={styles.loginGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginText}>Sign In</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Signup */}
              <View style={styles.signup}>
                <Text style={{ color: "#8e9aaf" }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.signupLink}>Sign Up</Text>
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
  header: { alignItems: "center", marginBottom: 60, marginTop: 0 },
  backButton: { position: "absolute", left: 0, top: 0, padding: 8 },
  logo: { width: 200, height: 120 },
  subtitle: { color: "#a8b2c1", marginTop: 10, fontSize: 16 },
  form: { width: "100%" },
  loginBtn: { overflow: "hidden", borderRadius: 12, marginBottom: 24 },
  loginGradient: { height: 56, justifyContent: "center", alignItems: "center" },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  signup: { flexDirection: "row", justifyContent: "center" },
  signupLink: { color: "#FF6B35", fontWeight: "bold" },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  socialButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 12 },
});
