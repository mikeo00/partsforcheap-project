import React, { useRef, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import slidesHook from "../hooks/slides";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function AutoCarousel() {
  const navigation = useNavigation();
  const { slides, loading, error } = slidesHook();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slides.length > 0) {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentIndex, slides]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ width, alignItems: "center", justifyContent: "center" }}>
          {item.image_url && <Image source={{ uri: item.image_url }} style={{ width: 300, height: 150 }} />}
          {item.title && <Text>{item.title}</Text>}
          {item.description && <Text>{item.description}</Text>}
          {item.has_button && (
            <TouchableOpacity onPress={() => navigation.navigate(item.link_screen, item.link_params || {})}>
              <Text>{item.button_text}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
}
