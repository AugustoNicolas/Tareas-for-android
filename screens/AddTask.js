import { useContext } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Platform,Image  } from 'react-native';
import { useState } from "react"
import DateTimePicker  from '@react-native-community/datetimepicker';
import {tasksContext} from '../models/task';
import {createTask} from '../helpers/createTask'

//onChangeText ={} -- onPress={onAddTask}
export const AddTask = ({navigation}) =>{

  //const hangleraddTask = route.params.addTAsk;
  const [nombre, setnombre] = useState("")
  const [detalle, setdetalle] = useState("")
  const [nota, setnota] = useState("")

  
  const [vencimiento, setvencimiento] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false)
  const [text, setText] = useState('Empty')

  const { foto, origin, putData } = useContext(tasksContext)

  const upData = async()=> {
    resp = await createTask(nombre,detalle,vencimiento, nota,origin,foto)
    putData()
    navigation.goBack();
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || vencimiento;
    setShow(Platform.os === 'ios');
    setvencimiento(currentDate)

    let temDate = new Date(currentDate)
    let fDate = temDate.getDate() + '/'+(temDate.getMonth() + 1) + '/' + temDate.getFullYear();
    setText(fDate)
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const handleName=(txt)=>{
    setnombre(txt)
  }
  const handleDesc=(txt)=>{
    setdetalle(txt)
  }
  const handleNot=(txt)=>{
    setnota(txt)
  }

  return(
    <View >
      
      <Button title="Agregar tarea"  onPress={upData}></Button> 
         <Text style={styles.titleText}> {'Nombre:'} </Text>
        <TextInput style={styles.inputStyle} onChangeText ={handleName}/>
          <Text style={styles.titleText}> {'Detalle:'} </Text>
        <TextInput style={styles.inputStyle}  onChangeText ={handleDesc}/>
          <Text style={styles.titleText}> {'Nota:'} </Text>
        <TextInput style={styles.inputStyle}  onChangeText ={handleNot}/>


        <View>
          <Text style={styles.titleText}> {text} </Text>
          <View style={styles.btn}>
             <Button style={styles.button}  onPress={showDatepicker} title='Show date picker!'/>
          </View>

          <View style={styles.btn}>
             <Button style={styles.button}  onPress={()=>navigation.navigate('Foto')}
              title='Foto'/>
          </View>
          {foto? <Image style={styles.tinyLogo} source={{uri:"data:image/jpg;base64,"+ foto.base64}}/>: undefined}
          
        </View>

        <View style={styles.btn}>
             <Button style={styles.button}  onPress={()=>navigation.navigate('Map')} title='Agregar ubicacion'/>
          </View>

        {show && (
        <DateTimePicker 
        testID='dateTimePicker' 
        value={vencimiento} 
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}
        /> 
      )}

      </View>
  )
}


const styles = StyleSheet.create({    
    inputStyle: {
      borderWidth: 3, 
      margin: 5,
    },
    titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    margin: 10
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  });