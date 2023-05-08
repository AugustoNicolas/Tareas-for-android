import { Text, View, StyleSheet, Button, Image,Pressable } from 'react-native';

export const ItemTask = ({id, nombre, detalle,foto, goPageDesc, deleteT}) => {
  return(
    <View style={styles.container}>     
      <Text style={styles.titleText}>{nombre}:</Text>
      <Text>{detalle}</Text>
      <Image
                style={styles.tinyLogo}
                source={
                  //foto.length > 0
                  foto && foto[0]
                    ? { uri: "data:image/jpg;base64," + foto[0].base64 }
                    : { uri: "https://img.freepik.com/vector-premium/error-404-pagina-no-encontrada-banner-archivo-sitio-web-diseno-plano_249405-255.jpg" }
                }
            />
      <View style={styles.minContainer}>        
        <View style={styles.btn}>        
          <Button color={"red"} title="Eliminar"  onPress={deleteT} />
        </View>
        <Pressable onPress={goPageDesc} > 
          <Text>Ver mas detalles...</Text>
        </Pressable>
        {/* <View style={styles.btn}>        
          <Button style={styles.btn} title="Eliminar"  onPress={() => onDeleteTask(id)} />
        </View> */}
      </View>      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  btn: {
    margin: 20
  },
  minContainer:{
    flex:1,
    padding:5,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  }
})