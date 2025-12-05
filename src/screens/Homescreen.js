import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import AutoCarousel from '../components/AutoCarousel'

const homescreen = () => {
  return (
    <View>
      <Header/>
      <SearchBar/>
      <AutoCarousel/>
    </View>
  )
}

export default homescreen

const styles = StyleSheet.create({})