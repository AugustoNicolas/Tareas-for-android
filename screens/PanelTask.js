import React, { useContext, useEffect, useState, useRef } from 'react';
import { Platform , View, StyleSheet, FlatList, Button } from 'react-native';
import {ItemTask} from '../components/ItemTask'
import {tasksContext} from '../models/task';
import {deleteTask} from '../helpers/deleteTask'


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const PanelTask = ({navigation}) =>{


  //************* Code para las notificaciones ************ */

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

    //*************  ************ */

  const { tasks, putData } = useContext(tasksContext)

  useEffect(() => {
    const inicio = async() => {
      await putData()
      if (tasks.length > 0) {
        for (const item of tasks)  {
          if (item.vencimiento) {
            const hoy = new Date();
            const vencimiento = new Date(item.vencimiento);
            console.log(vencimiento.getFullYear() === hoy.getFullYear() &&
            vencimiento.getMonth() === hoy.getMonth() &&
            vencimiento.getDate() === hoy.getDate())
            if (vencimiento.getFullYear() === hoy.getFullYear() &&
                vencimiento.getMonth() === hoy.getMonth() &&
                vencimiento.getDate() === hoy.getDate()) {
              console.log("¡Es hoy!");
              await schedulePushNotification(item);
              break; 
            }
          }
        } 
      }
    }
    inicio()
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


  async function schedulePushNotification(item) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Tarea aputno de vencer! ⌛",
        body: item.nombre,
        data: { data: 'goes here' },
        sound: 'default'
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
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
  
    return token;
  }