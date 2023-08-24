import React from 'react';
import { StyleSheet, View } from 'react-native';

export function HoldingBlock({children}){
return (
    <View style={styles.boxWithShadow}>
        {children}
    </View>
)
}
const styles = StyleSheet.create({
  boxWithShadow: {
      // Optionally reduce or remove the borderWidth to make shadow more prominent
      borderWidth: 0.5, 
      borderColor: "#393737",
      borderRadius: 9,
      shadowColor: "#393737",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 7,
      elevation: 5, // for Android
      overflow: 'hidden', // Ensure children don't overflow and display outside the shadow
  },
});