import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import colors from '../constants/colors';

const NetWorkStatus = () => {

    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        NetInfo.addEventListener(state => setIsOnline(state.isConnected));
    }, [])

    return !isOnline && <View style={styles.container}><Text style={styles.text}>No Internet connection!</Text></View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9
    },
    text: { color: colors.white, fontSize: 12, fontFamily:'MediumItalic' }
})

export default NetWorkStatus;