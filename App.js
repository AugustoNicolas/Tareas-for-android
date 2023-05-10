import React from 'react';
import { Text, Pressable, StyleSheet, Platform  } from 'react-native';
import Constants from 'expo-constants';
import {AddTask} from './screens/AddTask'
import {PanelTask} from './screens/PanelTask'
import {Foto} from './screens/Foto'
import {Map} from './screens/Map'
import {DetalleTask} from './screens/DetalleTask'
import {MapDetalle} from './screens/MapDetalle'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'
import { TasksProvider } from './models/task';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <TasksProvider>
    <NavigationContainer style={styles.container}>
      <Stack.Navigator> 

        <Stack.Screen name="PanelTask" component={PanelTask} 
        options={({navigation}) => ({
          title: 'Tareas: ',
          headerStyle: {
            backgroundColor: 'gray'
          },
          headerTintColor:'white'  ,
          headerRight: () => (
          <Pressable 
                style={{margin:10}}
                onPress={()=>navigation.navigate('AddTask')} >
                  <AntDesign name="addfile" size={24} color="black" />
            </Pressable>
    )          
        })}
        />    

          <Stack.Screen name="AddTask" component={AddTask} 
          options={{
            title: 'Agregar Tareas',
            headerStyle: {
              backgroundColor: 'gray'
            },
            headerTintColor:'white'
          }} 
          />
          <Stack.Screen name="Foto" component={Foto} 
          options={{
            title: 'Foto',
            headerStyle: {
              backgroundColor: 'gray'
            },
            headerTintColor:'white'
          }} 
          />
          <Stack.Screen name="Map" component={Map} 
          options={{
            title: 'Mapa',
            headerStyle: {
              backgroundColor: 'gray'
            },
            headerTintColor:'white'
          }} 
          />
          <Stack.Screen name="detalle" component={DetalleTask} 
          options={{
            headerStyle: {
              backgroundColor: 'gray'
            },
            headerTintColor:'white'
          }} 
          />
          <Stack.Screen name="DetalleMap" component={MapDetalle} 
          options={{
            headerStyle: {
              backgroundColor: 'gray'
            },
            headerTintColor:'white'
          }} 
          />

              
      </Stack.Navigator >
    </NavigationContainer>
    </TasksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
});
