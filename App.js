import React, {useEffect} from 'react';
import { Text, Pressable, StyleSheet, Alert } from 'react-native';
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

import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

export default function App() {

  // const requestUserPermission = async() => {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   }


  // useEffect(() => {
  //   if (requestUserPermission()){
  //     //aqui retornamos el token
  //     messaging().getToken().then(token => {
  //       console.log(token)
  //     })
  //   }
  //   else {
  //     console.log("Faile token status", authStatus)
  //   }

  //   messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //     messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });

  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       console.log('Message handled in the background!', remoteMessage);
  //     });

  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     });
  
  //     return unsubscribe;

  // }, [])

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
