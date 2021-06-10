import React from 'react'
import colors from '../../constants/colors'
import { TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native'

const TextButton = ({ title, color, onPress }) => {
    return (
        <TouchableOpacity style={styles.bottomSheetOptionContainer} onPress={()=>{onPress();Keyboard.dismiss()}} >
            <Text style={[styles.bottomSheetOptionText,{color:color || colors.Black}]} >{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bottomSheetOptionContainer:{
        width:'100%',
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    bottomSheetOptionText:{
        fontSize:16,
        fontFamily:'MediumItalic'
    },
})

export default TextButton;
