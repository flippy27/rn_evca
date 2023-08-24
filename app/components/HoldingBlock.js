import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export function HoldingBlock2({children}){
return (
    <View style={styles.boxWithShadow}>
        {children}
    </View>
)
}
const styles = StyleSheet.create({
    boxWithShadow: {
        borderWidth: 1.10,
        width: 100,
        height: 100,
        borderColor: "#393737", // Cambia el color del borde
        borderRadius: 9,
        shadowColor: "#393737", // Color de la sombra
        shadowOffset: {
          width: 1,  // No desplazamiento horizontal
          height: 1, // No desplazamiento vertical
        },
        shadowOpacity: 0.5, // Ajusta la opacidad de la sombra
        shadowRadius: 7,
        elevation: 5, // Solo para Android
      },
    });