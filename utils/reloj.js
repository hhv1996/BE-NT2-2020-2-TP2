import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default({min,seg,textTipo})=>{


    return(
        <View style={styles.reloj}>
            <Text style={styles.textoTitulo}>{textTipo}</Text>
            <Text style={styles.texto}>Tiempo restante:</Text>
            <Text style={styles.textoReloj}>{min}:{seg}</Text>            
        </View>
    );  
}
  
const styles = StyleSheet.create({
    textoTitulo:{
        color:'white',
        fontSize:30
    },
    textoReloj:{
        color:'white',
        fontSize:150
    }
  });