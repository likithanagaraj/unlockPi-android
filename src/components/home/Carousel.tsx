import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const Carousel = ({name,image}:any) => {
  return (
    <View style={styles.container}>
     <View> <Image style={{resizeMode:"contain",height:80,width:80}} source={image} /> </View>
      <View style={styles.textbox} >
      <Text style={{fontWeight:'bold'}}>{name}</Text>
      <Text style={{fontWeight:'light'}}>500+Empl...</Text>
      {/* <Ionicons name="star" size={24} color="black" /> */}
      {/* <FontAwesome name="google-plus-square" size={24} color="black" /> */}
      </View>
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
  container:{
   width: 143,
    height: 170,
    borderWidth:1,
    borderColor:'#D8D8D8',
    alignItems: "center", 
    justifyContent: "space-evenly", 
    flexDirection: "column",
    borderRadius: 10,
  },
  textbox:{
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column",
  }
})