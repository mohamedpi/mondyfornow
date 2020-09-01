import React, {Component} from 'react';
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

export default class LikedInterface extends Component {
                 constructor() {
                   super();
                   this.state = {
                     list: [1,2],
                     id :"",
                     refreshing: false,
                   };
                 }
                 async componentDidMount() {
                   try{

                        var id  = await AsyncStorage.getItem("userId")
                       this.setState({id:id})

                      }
                   catch (err) {
                     console.log(err.message);
                        }



                 }

                 _onRefresh = () =>  {
                   this.setState({refreshing: true});
                   axios
                     .get(`http://192.168.1.40:8082/user/getUser/?id=${this.state.id}`)
                     .then((resp) => {
                       this.setState({refreshing: false, list: resp.data.liked});
                     });
                 };

                async unfavorite(id,item){
                  console.log(id);
                 try {
                  // resp = await axios.delete(
                  //   'http://192.168.1.37:8082/games/removeFavorite',
                  //   {_id: id},
                  // );
                  //  console.log(resp.data)
                    axios.put(`http://192.168.1.40:8082/games/removeFavorite/${id}`,item)
                        .then((res) => {
                          console.log(res);
                          console.log(res.data);
                        });
                 } catch (error) {
                   console.log(error)
                 }
                 }

                 render() {
                   return (
                     <>
                       <ScrollView
                         refreshControl={
                           <RefreshControl
                             refreshing={this.state.refreshing}
                             onRefresh={this._onRefresh}
                           />
                         }>
                         <View style={styles.container}>
                           <View>
                             <Text style={styles.textStyle}>Your WishList</Text>
                           </View>

                           {(this.state.list) ? (
                             this.state.list.map((l, i) => (
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
                                       this.unfavorite(l._id,l);
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
