import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState}from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils';
import Reloj from "./utils/reloj";

export default function App() {
let minTrab= 0;
let minDesc=5;
let segg=60; 
let textTipo="Tiempo de Trabajar";
let esDescanso=false;

const [min,descontarMin]=useState(minTrab);
const [seg,descontarSegundos]=useState(segg);



useEffect(()=>{
  if(seg!=60 && seg>-1)
  {
    setTimeout(()=>{
      descontarSegundos(seg-1);
    },100); 
  }else{
    if (seg==-1 && min > 0){
      descontarSegundos(seg + 60);
      descontarMin(min-1);
    }else{
      if(seg==-1 && min <= 0)
      {
        descontarSegundos(seg + 61);
        descontarMin(min + minDesc-1);
        Alert.alert(
          "Tiempo terminado",
          ":)",
          [
            {
              text: "Ok",
              onPress: () => console.log("holoa")
            }
          ]); 
      }
    }
  }
},[seg])

function empezar(){
  descontarSegundos(seg-1);
}
  return (
    <View style={styles.container}>
      <Reloj textTipo={textTipo} seg={seg} min={min}></Reloj>
      <Button 
        title="Empezar"
        onPress={empezar}
      />
      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
