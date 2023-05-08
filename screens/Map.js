import React, { useContext } from 'react';
import { useState,useEffect } from "react"
import {  View, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {tasksContext} from '../models/task';

export const Map = ({navigation}) =>{
    
  const { origin, setOrigin } = useContext(tasksContext)


    return(
        <View style={styles.container}>
            <MapView style={styles.map} 
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}> 
                <Marker 
                    draggable={true}
                    coordinate={origin}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} /> 
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'center'
    },
    map:{
      width: '100%',
      height: '100%',
    },
    preview:{
      alignSelf:'stretch',
      flex:1
    }
  })