import React,{ useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const AppInput = ({ placeHolder, onChange, value, autoFocus, heading, isEditable }) => {

    const [showHint, setShowHint] = useState( value ? true : false)
    const [showError, setShowError] = useState(false)

    const handleInput = ( val )=> {
        if(val.length != 0){
            setShowHint(true);setShowError(false)
        }
        else {
            setShowHint(true);setShowError(true)
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.inputHeading} >{heading}</Text>
        <View style={styles.inputContainer} >
            <TextInput
                keyboardType={'default'}
                placeholderTextColor={colors.Grey}
                placeholder={placeHolder}
                style={styles.input}
                onChangeText={onChange}
                defaultValue={value}
                autoFocus={autoFocus}
                autoCapitalize='words'
                editable={isEditable}
                onChange={(e)=>handleInput(e.nativeEvent.text)}
                />
            {showHint ? <>{ showError ?  <Icon name='alert-circle-outline' color='red' size={20} /> : <Icon name='checkmark-circle-outline' color='green' size={20} />}</> : null}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:12.5,
        zIndex:1000
    },
    inputHeading:{
        alignSelf:"flex-start",
        marginLeft:10,
        fontFamily:'MediumItalic'
    },
    inputContainer: {
        fontSize: 15,
        paddingHorizontal:10 ,
        width:'95%',
        flexDirection:'row',
        backgroundColor:colors.lightGrey,
        margin:3.5,
        fontFamily:'MediumItalic',
        color:colors.Black,
        opacity:0.7,
        alignItems:"center",
        height:40
    },
    input:{
        width:'95%',
        fontFamily:'MediumItalic',
        color:colors.Black,
        opacity:0.7
    }
    //error: {  fontSize: 12, margin: 3.5, color:'red' }
})

export default AppInput;
