import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import AutoCarousel from '../components/AutoCarousel'
import BrandGrid from '../components/GridOfBrands'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <SearchBar/>
      <AutoCarousel/>
      <BrandGrid/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})