import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { theme } from '../../utils/theme';

const Carousel = ({name,image}:any) => {

  const imageUrl = image;
  return (
    <View className='' style={styles.container}>
     <View> <Image style={{resizeMode:"contain",height:80,width:80}} source={{uri:imageUrl}} /> </View>
      <View style={styles.textbox} >
      <Text style={{color:theme.darktext,fontFamily:"Geist-Bold"}}>{name}</Text>
      <Text style={{color:theme.lighttext,fontFamily:"Geist"}}>500+Empl...</Text>
      
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
    borderColor:theme.bordercolor,
    alignItems: "center", 
    justifyContent: "space-evenly", 
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor:theme.cardbg,
    // opacity:5
  },
  textbox:{
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column",
  }
})