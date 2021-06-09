import React from 'react';
import { View,  StyleSheet,  } from 'react-native';
import Header from '../components/header';
import FAB from '../components/buttons/floating-action-button';

const Home = () => {

    return (
        <View style={styles.container} >
            <Header />
            <FAB onPress={() => collections.length ?  sheetRef.current.openSheet() : setShowCollectionDialogue(true)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.White
    },
})

export default Home