import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import {ItemTask} from '../components/ItemTask'
import { useEffect } from "react"
import {tasksContext} from '../models/task';
import {deleteTask} from '../helpers/deleteTask'


export const PanelTask = ({navigation}) =>{

  const { tasks, putData } = useContext(tasksContext)

  useEffect(() => {
    putData()
  }, []);


  const PaRenderizar = (ItemData) =>{

    const deleteT = async() => {
      await deleteTask(ItemData.item._id)
      putData()
    }
    const goPageDesc = () => {
        navigation.navigate('detalle',{
          item : ItemData.item
        })
    }
    return(
      <ItemTask deleteT={deleteT} goPageDesc={goPageDesc} nombre={ItemData.item.nombre}  detalle={ItemData.item.detalle} id={ItemData.item._id} foto={ItemData.item.foto}/>
    )
  }
  return(
    <View style={styles.container} >
      <View style={styles.btn}>        
        <Button onPress={()=>navigation.navigate('AddTask')}  title="Agregar nueva tarea" />
      </View>
        <FlatList //style={styles.panel}
          data={tasks}
          keyExtractor={ (item) => item._id }
          renderItem={PaRenderizar }
         // numColumns={2}
        />
    </View>
  )
}


const styles = StyleSheet.create({    
   panel: {
    justifyContent: 'center',
    alignItems:'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  container: {
    padding: 20
  },
  btn: {
    margin: 5
  }
  });