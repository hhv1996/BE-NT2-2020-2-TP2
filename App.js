import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState}from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils';
import Reloj from "./utils/reloj";

let minTrab=25;
let minDes=5;
let minAux=minTrab;
let segun=0;
let intervaloID=null;
let trabODesc = true;

export default function App() {
  const [seg,setSegundos]=useState(segun);  
  const [min,setMinutos]=useState(minTrab);  
  const [botonControl,setBotonControl]=useState(false)

  const [titulo,setTitulo]=useState("Hora de trabajar :(");
  const [empezarOPausa,setEmpezarPausa]= useState(false);

  useEffect(()=>{
    if(empezarOPausa){
      intervaloID= setInterval(()=>{
        if (segun>0){
          setSegundos((--segun));
        }else{
          segun=59;
          setSegundos(segun);
          if(minAux>0){
            setMinutos((--minAux));
          }else{
            cambiarCiclo();
          }
        }
      },1000);
      }
    else{
      clearInterval(intervaloID);
    }
  },[empezarOPausa]);

  function cambiarCiclo (){
    if(empezarOPausa){
      if(trabODesc){
        minTrab=25;
        setMinutos(minDes-1);
        minAux=minDes-1;
        trabODesc=false;
        setTitulo("Hora de descansar :)");
        vibrate();
      }else{
        minDes=5;
        setMinutos(minTrab-1);
        minAux=minTrab-1;
        trabODesc=true;
        setTitulo("Hora de trabajar :(");
        vibrate();
      }
    }
  }

  function pausa(){
    if(empezarOPausa){
      setEmpezarPausa(false);
    }else{
      setEmpezarPausa(true);
    }
  }  
  function reiniciar(){
    clearInterval(intervaloID);
    setEmpezarPausa(false);
    segun=0;
    setSegundos(segun);
    minTrab=25;
    minDes=5;
    minAux=minTrab;
    setMinutos(minTrab);
    setBotonControl(false); 
    setTitulo("Hora de trabajar :(");
  }  
  return (
    <View style={styles.container}>
      <Reloj textTipo={titulo} seg={seg} min={min}></Reloj>
      <View style={styles.botones}>
        <Button 
          title="Empezar"
          onPress={()=>{setEmpezarPausa(true);
          setBotonControl(true);     
          }}
          disabled={botonControl}
        />
        <Button 
          title="Pausar"
          onPress={()=>{
            pausa();
            setBotonControl(false);     
          }}
          disabled={!botonControl}
        />
        <Button 
          title="Reiniciar"
          onPress={reiniciar}
        />
      </View>
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
  botones:{
    flexDirection: 'row'
  },
  texto:{
    color:'white',
    fontSize:40
  }
});
