import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const SearchBar = () => {
    const screenWidth = Dimensions.get("window").width;
    const [active,setActive] = useState(false);

  return (
    <View style={[active && styles.activewrapper,styles.wrapper]} onPressIn={()=>setActive(true)} onPressOut={()=>setActive(false)}>
      <Ionicons name="search-outline"/>
      <TextInput placeholder='Search What You Want' placeholderTextColor={"black"} />
      <TouchableOpacity>
        <Ionicons name="search-circle"/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    wrapper:{
        display:"flex",
        flexDirection:"row",
        width:screenWidth-8,
        alignItems:"center",
        borderRadius:50,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 16,
        height: 40,
        marginBottom: 16,
    },
    activewrapper:{
        borderColor:"orange"
    }
})