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
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import InputField from "../components/InputField";
import { supabase } from "../lib/supabase";

export default function RegisterScreen({navigation}){
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorlname, setErrorLname] = useState("");
    const [erroremail, setErrorEmail] = useState("");
    const [errorfname, setErrorFname] = useState("");
    const [errorpass, setErrorPass] = useState("");

  const handleRegister = async () => {
  const trimmedFname = fname.trim();
  const trimmedLname = lname.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  let valid = true;

  if (!/^[A-Za-z]+$/.test(trimmedFname)) {
    setErrorFname("Enter a valid first name");
    valid = false;
  } else setErrorFname("");

  if (!/^[A-Za-z]+$/.test(trimmedLname)) {
    setErrorLname("Enter a valid last name");
    valid = false;
  } else setErrorLname("");

  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedEmail)) {
    setErrorEmail("Enter a valid email");
    valid = false;
  } else setErrorEmail("");

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?_ -]).{8,}$/.test(trimmedPassword)) {
    setErrorPass("Password must be 8+ chars, include upper/lower, number & special char");
    valid = false;
  } else setErrorPass("");

  if (!valid) return;

  setLoading(true);
  const { data, error } = await supabase.auth.signUp({
    email: trimmedEmail,
    password: trimmedPassword,
    options: { data: { fname: trimmedFname, lname: trimmedLname } }
  });
  setLoading(false);

  if (error) Alert.alert("Error", error.message);
  else Alert.alert("Success", "Account created! Please verify your email.");
};

    return (
        <View style={{flex:1}}>
            <StatusBar style="light"></StatusBar>
            <LinearGradient
            colors={["#1a1a2e", "#16213e", "#0f3460"]}
            style={{flex:1}}
            >
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView style={styles.container}
                    behavior={Platform.OS==="ios"?"padding":undefined}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={()=>navigation.goBack()}
                            style={styles.backButton}>
                                <Ionicons name="arrow-back" size={24} color="#fff"/>
                            </TouchableOpacity>
                            <Image
                                source={require("../../assets/PARTS_FOR_CHEAP-removebg-preview.png")}
                                style={styles.logo}
                                resizeMode="contain"></Image>
                            <Text style={styles.subtitle}>
                                Create your new account in CarsForCheap!
                            </Text>
                        </View>
                        <View style={styles.form}>
                            <InputField
                                icon="person-outline"
                                placeholder="First Name"
                                keyboardtype="default"
                                autoCapitalize="words"
                                value={fname}
                                onChangeText={setFname}
                            />
                            <Text style={styles.err}>{errorfname}</Text>
                            <InputField
                                icon="person-outline"
                                placeholder="Last Name"
                                keyboardtype="default"
                                autoCapitalize="words"
                                value={lname}
                                onChangeText={setLname}
                            />
                            <Text style={styles.err}>{errorlname}</Text>
                            <InputField
                                icon="mail-outline"
                                placeholder="Email Address"
                                keyboardtype="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Text style={styles.err}>{erroremail}</Text>
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
                            <Text style={styles.err}>{errorpass}</Text>
                            <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 10 }}>
                                            <Text style={{ color: "#FF6B35" }}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={24} color="#fff" />
                                <Text style={styles.socialButtonText}>Continue with Google</Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={24} color="#fff" />
                                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity
                                disabled={loading}
                                onPress={handleRegister}
                                style={styles.RegBtn}
                            >
                                <LinearGradient
                                colors={["#FF6B35", "#F7931E"]}
                                style={styles.signUpGradient}
                                >
                                {loading ? (
                                <ActivityIndicator color="#fff" />
                                ) : (
                                <Text style={styles.signUpText}>Sign Up</Text>
                                )}
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
  header: { alignItems: "center", marginBottom: 30, marginTop: 0 },
  backButton: { position: "absolute", left: 0, top: 0, padding: 8 },
  logo: { width: 200, height: 120 },
  subtitle: { color: "#a8b2c1", marginTop: 10, fontSize: 16 },
  form: { width: "100%" },
  signUpBtn: { overflow: "hidden", borderRadius: 12, marginBottom: 24 },
  signUpGradient: { height: 56, justifyContent: "center", alignItems: "center" },
  signUpText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  login: { flexDirection: "row", justifyContent: "center" },
  signinLink: { color: "#FF6B35", fontWeight: "bold" },
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
  err:{
    color:"#fff",
    fontSize: 14,
    fontWeight: "300",
    marginBottom:7,
  },
  socialButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 12 },
});