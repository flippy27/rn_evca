import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { CustomTextInput } from './CustomTextInput';
import { LogoSVG } from './Logo';
 
export const TextAndLogo=()=>{
    return (
        <View style={{flex:0, justifyContent:'center', alignItems:'center'}}>
            <View>
            <LogoSVG/>
            </View>
            <Text style={{fontFamily: 'Montserrat-Semi', color:'#393737', fontSize:24, paddingTop:15}}>Hola</Text>
        </View>
    )
}