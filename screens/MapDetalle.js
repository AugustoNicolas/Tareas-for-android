import React, { useLayoutEffect } from 'react';
import {  View, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

export const MapDetalle = ({route, navigation}) =>{
    
  const origin = route.params.origin
  console.log(origin.latitude)
  //navigation.setOptions({ title: route.params.nombre })
  useLayoutEffect(() => {
    navigation.setOptions({ title: "mapa de: " + route.params.nombre });
  }, [navigation,  route.params.nombre]);

    return(
        <View style={styles.container}>
            <MapView style={styles.map} 
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}> 
                <Marker coordinate={origin} /> 
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