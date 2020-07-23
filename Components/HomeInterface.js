import React from "react"
import {View,Text,Image,SafeAreaView,StyleSheet,ScrollView} from "react-native"
import { Button, ThemeProvider,Card,ListItem} from 'react-native-elements';
import { List } from 'react-native-paper';


function HomeInterface(){
  return(
    <>
    <SafeAreaView style ={styles.container} >
      <ScrollView scrollEventThrottle={16}>
       <View>
          <Text style={styles.textStyle}>check our hot list</Text>
       </View>
       <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            <Card
               containerStyle={styles.cardStyle}
               imageStyle={styles.imageStyle}
               image={require('../assets/cover.jpg')}>
             </Card>
             <Card
                containerStyle={styles.cardStyle}
                imageStyle={styles.imageStyle}
                image={require('../assets/clashofclans.jpg')}>
              </Card>
              <Card
                 containerStyle={styles.cardStyle}
                 imageStyle={styles.imageStyle}
                 image={require('../assets/valorant.jpg')}>
               </Card>
               <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/uncharted4.jpg')}>
                </Card>
          </ScrollView>
       </View>

       <View>
          <Text style={styles.textStyle}>check our new offers</Text>
       </View>
       <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            <Card
               containerStyle={styles.cardStyle}
               imageStyle={styles.imageStyle}
               image={require('../assets/dimond1.png')}>
             </Card>
             <Card
                containerStyle={styles.cardStyle}
                imageStyle={styles.imageStyle}
                image={require('../assets/dimond2.png')}>
              </Card>
              <Card
                 containerStyle={styles.cardStyle}
                 imageStyle={styles.imageStyle}
                 image={require('../assets/dimond3.png')}>
               </Card>
               <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/dimond4.jpg')}>
                </Card>
          </ScrollView>

          <View>
             <Text style={styles.textStyle}>Discounts</Text>
          </View>
       </View>

      </ScrollView>
    </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:0,
    backgroundColor:"#121419"
  },
  cardStyle:{
    width:135,
    height:135,
    borderRadius:20

  },
  imageStyle:{
    width:135,
    height:135,
    resizeMode:"cover",
    borderRadius:20

  },
  titleStyle:{
      flex:1,
      width:135,
      height:90,
      marginBottom:120
  },
  textStyle:{
    paddingHorizontal:15,
    marginVertical:15,
    fontFamily:"GlueGun-GW8Z",
    fontSize:25,
    color:"#dce0e9"
  }

})
export default HomeInterface
