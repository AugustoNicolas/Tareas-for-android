import * as React from 'react';
import { useContext } from 'react';
import { Text, View, StyleSheet, Button, Image, SafeAreaView } from 'react-native';
import {useEffect,useRef,useState} from 'react';
import {Camera} from 'expo-camera';
import {shareAsync} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import {tasksContext} from '../models/task';

export const Foto = ({route, navigation}) =>{
    let cameraRef = useRef();
    const [hasCameraPermission,setHasCameraPermission]=useState();
    const [hasMediaLibraryPermission,setHasMediaLibraryPermission]=useState();
    const [photo,setPhoto]=useState();
    
    const { addFoto } = useContext(tasksContext)
     
    useEffect(()=>{
        (async ()=>{
          const cameraPermissions = await Camera.requestCameraPermissionsAsync();
          const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
          setHasCameraPermission(cameraPermissions.status==="granted");
          setHasMediaLibraryPermission(mediaLibraryPermission.status==="granted");
        })();
      },
      []);

    if(hasCameraPermission===undefined){
        return <Text> Conceda permisos....</Text>
    }else if(!hasCameraPermission){
      return<Text> Sin permisos para usar la camara</Text>
    }

    const takePic=async()=>{
        let options={
          quality:1,
          base64:true,
          exif:false
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
      }

      if(photo){
        let sharePic=()=>{
            shareAsync(photo.uri).then(() => {
              setPhoto(undefined);
            })
        };
        let savePic= async()=>{
          await addFoto(photo);
          navigation.goBack();
          setPhoto(photo);
        };
        return(
          <SafeAreaView style={styles.container}>
            <Image style={styles.preview} source={{uri:"data:image/jpg;base64,"+ photo.base64}}/>
            <Button title="Share" onPress={sharePic} />
            {hasMediaLibraryPermission ? <Button title="Save" onPress={savePic}/>: undefined}
             <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </SafeAreaView>
        )
      }
      return (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.button}>
            <Button title="Tomar Foto" onPress={takePic}>
            </Button>
          </View>
        </Camera>
      );
    }
    
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      button:{
        backgroundColor:'white',
        alignSelf:'flex-end'
      },
      preview:{
        alignSelf:'stretch',
        flex:1
      }
    })