import { StyleSheet, View,Text,Image,Button } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

export const DetalleTask = ({route, navigation}) => {
    
    
    const item = route.params.item 
    navigation.setOptions({ title: item.nombre })
    let temDate = new Date(route.params.item.vencimiento)
    let fDate = temDate.getDate() + '/'+(temDate.getMonth() + 1) + '/' + temDate.getFullYear();

    const goMap = () => {
      navigation.navigate('DetalleMap',{
        origin : item.origin,
        nombre : item.nombre
      })
    }
    return(
        <View style={styles.contenedorInterno}>
            <Text style={styles.titleText}> {item.detalle} </Text>
            <Text style={styles.text}> { "Fecha de vencimiento: " + fDate} </Text>
            <Text style={styles.text}> {item.nota} </Text>
            <Image
                style={styles.tinyLogo}
                source={
                  //foto.length > 0
                  item.foto && item.foto[0]
                    ? { uri: "data:image/jpg;base64," + item.foto[0].base64 }
                    : { uri: "https://img.freepik.com/vector-premium/error-404-pagina-no-encontrada-banner-archivo-sitio-web-diseno-plano_249405-255.jpg" }
                }
            />
            <View style={styles.btn}>
             <Button style={styles.button}  onPress={goMap} title='Ver ubicacion'/>
          </View>
        </View>
    )
}
    // estado: Number,


const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#fff',
      justifyContent:'center'
    },
    contenedorInterno:{
      padding: 5,
      margin: 30,
      justifyContent:'center',
      alignItems:'center'
    },
    map:{
        width: 300,
        height: 300,
    },
    text:{
       textAlign: 'center',
       margin: 5
    },
    tinyLogo: {
      width: 300,
      height: 300,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  })