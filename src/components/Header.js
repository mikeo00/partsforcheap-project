import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import DrawerNav from '../navigation/DrawerNav'

const Header = () => {
  return (
    <View>
      <DrawerNav/>
                <Image
                source={require("../../assets/PARTS_FOR_CHEAP-removebg-preview.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.txt}>
                PARTSFORCHEAP
              </Text>
              {/*cart*/}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})