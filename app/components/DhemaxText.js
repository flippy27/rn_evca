import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { CustomTextInput } from './CustomTextInput';
 
export const DhemaxText=()=>{
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontFamily: 'Montserrat-Semi', fontSize:30, minHeight:70, flexBasis: 'auto', marginTop:650}}> by Dhemax </Text>
        </View>
    )
}