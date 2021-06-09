import React from 'react'
import { View, StyleSheet,  } from 'react-native'
import { Icons } from '../assets/icons';
import FAB from '../components/buttons/floating-action-button';
import Header from '../components/header';
import colors from '../constants/colors';

const ViewCollection = ({ route, navigation }) => {

    return (
        <View style={styles.container} >
            <Header
                isShowIcons
                isShowBack
                right={ } />
            <FAB onPress={()=>setShowArticleDialogue(true)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.White
    },
})

export default ViewCollection;