import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios"

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

var whiteheart = require("../assets/whiteheart.png")
var likeheart   =require("../assets/coloredheart.png")




const OfferItem = (props) => {
  const {offer} = props.route.params
  const [id,setID]  = useState("")
  const [favorite,setFavorite]  = useState(false)

  useEffect(()=>{
    async function getID(){
     try{
          const id = await AsyncStorage.getItem('userId');
          setID(id)
        }
     catch (err) {
       console.log(err.message);
          }
     }
 getID()
  })

  const  toggleImage = favorite =>{
   if(favorite)
   {
     axios.put(`http://192.168.1.40:8082/games/removeFavorite/${id}`,offer)
   }
   else {
       axios.put(`http://192.168.1.40:8082/games/addFavorite/${id}`,offer)
   }
   setFavorite(!favorite)
 }
 //add to card :
 const addToCard = ()=>{
   axios.put(`http://192.168.1.40:8082/games/addToCard/${id}`,offer)
 }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{uri :offer.imageURI}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{offer.title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} >
            <Text style={styles.navTitle}>{offer.title + id}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Description</Text>

          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{offer.description}</Text>
          <TouchableOpacity style={styles.imageStyle} onPress={()=>toggleImage(favorite)} >
             <Image source ={(favorite)? likeheart : whiteheart} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.imageStyle} onPress={()=>addToCard()} >
                 <Text>Add To Card</Text>
                </TouchableOpacity>
        </View>


      </HeaderImageScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
  imageStyle:{
    alignItems:"center",


  }
});

export default OfferItem;
