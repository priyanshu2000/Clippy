import React from 'react'
import colors from '../constants/colors'
import { View, StyleSheet } from 'react-native'

const Divider = () => {
    return (<View style={styles.divider} ></View>)
}

const styles = StyleSheet.create({
    divider:{
        borderWidth:0.5,
        borderColor:colors.black,
        opacity:0.2
      }
})

export default Divider;
