import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default({min,seg,textTipo})=>{


    return(
        <View>
            <Text>{textTipo}</Text>
            <Text>Tiempo restante:</Text>
            <Text>{min}:{seg}</Text>            
        </View>
    );  
}
  