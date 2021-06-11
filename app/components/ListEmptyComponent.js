import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const ListEmptyComponent = () => {
    return (
        <View style={styles.listEmptyComponentContainer} >
            <Text style={styles.listEmptyComponentText} >No clips! Start by creating a collection using the + button</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listEmptyComponentContainer:{
        height:Dimensions.get('window').height-100,
        justifyContent:'center',
        alignItems:"center"
    },
    listEmptyComponentText:{
        fontFamily:'MediumItalic',
        fontSize:16,width:'55%',
        opacity:0.5
    },
})

export default ListEmptyComponent
