import React from 'react'
import { Modal, StyleSheet, View, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';

const Loader = ({isShow}) => {
    return (
        <Modal
            visible={isShow}
            transparent={true}
            animationType='slide'
            statusBarTranslucent={true}
            >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size='small' color={colors.black}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: colors.blackFade
    },
    activityIndicatorWrapper: {
        backgroundColor: colors.white,
        height: 60,
        width: 60,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 8000
    }
})

export default Loader
