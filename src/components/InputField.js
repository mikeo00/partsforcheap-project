import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InputField({ icon, rightIcon, ...props }) {
  return (
    <View style={styles.wrapper}>
      <Ionicons
        name={icon}
        size={20}
        color="#FF6B35"
        style={{ marginRight: 12 }}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#8e9aaf"
        {...props}
      />
      {rightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});
