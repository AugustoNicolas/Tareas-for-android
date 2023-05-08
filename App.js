import React, { useState, useEffect, useRef }  from 'react';
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

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



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


  //********* Part 2 */
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
