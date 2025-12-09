import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  const screenWidth = Dimensions.get("window").width;
  const [active, setActive] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        active && styles.activewrapper,
        { width: screenWidth - 8 } // ← FIX HERE
      ]}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      <Ionicons name="search-outline" size={18} />
      <TextInput
        placeholder="Search What You Want"
        placeholderTextColor="black"
        style={{ flex: 1, marginLeft: 8 }}
      />
      <TouchableOpacity>
        <Ionicons name="search-circle" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 16,
    height: 40,
    marginBottom: 16
  },
  activewrapper: {
    borderColor: "orange"
  }
});
