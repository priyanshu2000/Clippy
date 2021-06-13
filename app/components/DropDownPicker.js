import React,{ useState } from 'react'
import colors from '../constants/colors';
import { StyleSheet, View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

const DDPicker = ({ value, setValue, items, heading, placeHolder })=> {

  const [isOpen, setOpen] = useState(false);
  const [options, setOptions] = useState(items)

  return (
    <View>
        <Text style={styles.pickerHeading} >{heading}</Text>
        <DropDownPicker
            value={value}
            open={isOpen}
            items={options}
            bottomOffset={100}
            setValue={setValue}
            setItems={setOptions}
            itemKey={'collection_id'}
            closeAfterSelecting={true}
            placeholder={placeHolder}
            textStyle={styles.textStyle}
            setOpen={()=>setOpen(!isOpen)}
            style={styles.pickerContainer}
            dropDownContainerStyle={styles.dropDown}
            schema={{label:'collection_name',value:'collection_id'}}
        />
    </View>

  );
}

const styles = StyleSheet.create({
    pickerHeading:{
      alignSelf:"flex-start",
      marginLeft:10,
      fontFamily:'MediumItalic'
    },
    pickerContainer:{
      width:'95%',
      height:40,
      alignSelf:'center',
      borderRadius:0,
      borderWidth:0,
      margin:3.5,
      backgroundColor:colors.lightGrey
    },
    dropDown:{
      width:'95%',
      maxHeight:100,
      alignSelf:'center',
      borderRadius:0,
      borderWidth:0,
      margin:3.5,
      backgroundColor:colors.white
    },
    textStyle:{
      fontFamily:'MediumItalic'
    }
})

export default DDPicker;