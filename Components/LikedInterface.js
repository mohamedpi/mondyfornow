import React, {Component,useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import {ListItem} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {setLiked,setPanier} from "../actions/actions"
import {connect} from "react-redux"

function LikedInterface(props)  {
                // constructor() {
                //   super();
                //   this.state = {
                  //   list: [],
                  //   id :"",
                  //   refreshing: false,
                   //};
                 //}
const [list,setList] = useState([])
const [id,setID]   = useState("")
const  [refreshing,setRefreshing] = useState(false)

useEffect(()=>{
  async function fetchUser()
  {
    const id = await AsyncStorage.getItem('userId');
    setID(id)
    const resp = await axios(`http://192.168.43.173:8082/user/getUser/?id=${id}`)
    setList(resp.data.liked)
    props.setLiked(resp.data.liked)
    props.setPanier(resp.data.panier)

  }
  fetchUser()
})
                // async componentDidMount() {
                  // try{

                      //  var id  = await AsyncStorage.getItem("userId")
                      //  var liked = await AsyncStorage.getItem('@MySuperStore:key')
                      //  this.setState({id:id,liked:JSON.parse(liked)})

                      //}
                   //catch (err) {
                    // console.log(err.message);
                    //    }



                // }

                const _onRefresh = () =>  {
                  setRefreshing(true)
                   axios
                     .get(`http://192.168.43.173:8082/user/getUser/?id=${id}`)
                     .then((resp) => {

                       setRefreshing(false)
                        setList(resp.data.liked)

                     });
                 };

                async function unfavorite(id,offer){
                  console.log(id);
                 try {
                  // resp = await axios.delete(
                  //   'http://192.168.1.37:8082/games/removeFavorite',
                  //   {_id: id},
                  // );
                  //  console.log(resp.data)
                     axios.put(`http://192.168.43.173:8082/games/removeFavorite/${id}`,offer)

                 } catch (error) {
                   console.log(error)
                 }
                 }


                   return (
                     <>
                       <ScrollView
                         refreshControl={
                           <RefreshControl
                             refreshing={refreshing}
                             onRefresh={()=>_onRefresh()}
                           />
                         }>
                         <View style={styles.container}>
                           <View>
                             <Text style={styles.textStyle}>Your WishList</Text>
                           </View>

                           {(list) ? (
                             list.map((l, i) => (
                               <ListItem
                                 key={i}
                                 leftAvatar={{
                                   source: {
                                     uri:

                                       l.imageURI,
                                   },
                                   rounded: false,
                                 }}
                                 title={l.title}
                                 subtitle={l.description}
                                 bottomDivider
                                 rightIcon={
                                   <AntDesign
                                     name="heart"
                                     color="red"
                                     size={20}
                                     onPress={() => {
                                       console.log('hi');
                                       unfavorite(id,l);
                                     }}
                                   />
                                 }
                               />
                             ))
                           ) : (
                             <Text>You have nothing in your wishlist</Text>
                           )}
                         </View>
                       </ScrollView>
                     </>
                   );

               }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#121419',
  },
  textStyle: {
    paddingHorizontal: 15,
    marginVertical: 15,
    fontFamily: 'GlueGun-GW8Z',
    fontSize: 25,
    color: '#dce0e9',
  },
});
export default connect(null,{setLiked,setPanier})(LikedInterface)
