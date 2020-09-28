import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState}from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils';
import Reloj from "./utils/reloj";

//const [min,descontarMin]=useState(0)
const minutos =sMin=>{
  const [min,descontarMin]=useState(sMin);
  const desMin =()=>{
      if(min!=0)
        descontarMin(min-1);
    };
  const setMinutos = setMin=>{
    descontarMin(min-min+setMin);
  };

  return {min,desMin,setMinutos};
};

const segundos =()=>{
  const [seg,descontarSegundos]=useState(60);
  const desSeg =()=>{
    if(seg==0)
      descontarSegundos(seg+59);
    else
      descontarSegundos(seg-1);
  }
  return {seg,desSeg};
};

const reloj =minReloj=>{
  const {seg,desSeg}= segundos();
  const {min,desMin,setMinutos}= minutos(minReloj-1);

  const funcionar = ()=>{
    if(seg==0){
      desMin();
    }
    desSeg();
  };
  return {seg,min,funcionar,setMinutos};
};

let esDescanso=true;
let textTitulo = "Hora de trabajar! :(";
const relojPomodoro = (minDes,minTrab)=>{
  const {seg,min,funcionar,setMinutos}=reloj(minTrab);

  const comenzar = ()=>{
    console.log(min,seg,esDescanso);
    funcionar();
    if(min==0&&seg==1&&esDescanso){
      textTitulo = "Hora de descansar! :D";
      setMinutos(minDes-1);
      esDescanso=false;
      vibrate();
    }else{
      if(min==0&&seg==1&&esDescanso==false){
        textTitulo = "Hora de trabajar! :(";
        setMinutos(minTrab-1);
        esDescanso=true;
        vibrate();
      }
    }
  };
  return {seg,min,comenzar};
};


export default function App() {
const {seg,min,comenzar}=relojPomodoro(1,2);
useEffect(()=>{
  if(seg!=60){
    setTimeout(()=>{
      comenzar();
    },1000); 
  }
},[seg]);
  return (
    <View style={styles.container}>
      <Reloj textTipo={textTitulo} seg={seg} min={min}></Reloj>
      <Button 
        style={styles.boton}
        title="Empezar"
        onPress={comenzar}
      />
      <StatusBar style="auto" />
      <Text style={styles.texto}>-----------------</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton:{
    fontSize:60
  },
  texto:{
    color:'white',
    fontSize:40
  }
});
