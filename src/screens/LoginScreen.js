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

const fetchAdminStatus = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("is_admin")
      .eq("user_id", userId)
      .single();

    if (error) return false;
    return data?.is_admin || false;
  } catch {
    return false;
  }
};

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      phone: phoneNumber,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Login Failed", "Invalid phone or password.");
      return;
    }

    const user = data.user;
    const isAdmin = await fetchAdminStatus(user.id);

    if (isAdmin) {
      Alert.alert("Welcome Admin");
      navigation.navigate("AdminDashboard");
    } else {
      Alert.alert("Welcome");
      navigation.navigate("Homescreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient colors={["#1a1a2e", "#16213e", "#0f3460"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <Image
                source={require("../../assets/PARTS_FOR_CHEAP-removebg-preview.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.subtitle}>Welcome back! Sign in with your phone number</Text>
            </View>

            <View style={styles.form}>
              <InputField
                icon="call-outline"
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
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

              <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={24} color="#fff" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={24} color="#fff" />
                  <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={loading} onPress={handleLogin} style={styles.loginBtn}>
                <LinearGradient colors={["#FF6B35", "#F7931E"]} style={styles.loginGradient}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Sign In</Text>}
                </LinearGradient>
              </TouchableOpacity>

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
  socialButtonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 12 },
});
