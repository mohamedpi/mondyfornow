import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

export default class LikedInterface extends Component {
                 constructor() {
                   super();
                   this.state = {
                     list: [],
                     refreshing: false,
                   };
                 }
                 async componentDidMount() {
                   const resp = await axios.get(
                     'http://192.168.1.213:8082/games/showFavorites',
                   );
                   console.log(resp);
                   console.log(resp.data);
                   this.setState({list: resp.data});
                 }

                 _onRefresh = () =>  {
                   this.setState({refreshing: true});
                   axios
                     .get('http://192.168.1.213:8082/games/showFavorites')
                     .then((resp) => {
                       this.setState({refreshing: false, list: resp.data});
                     });
                 };

                 unfavorite(id){
                   console.log(id);
                  axios.delete(
                    'http://192.168.1.213:8082/games/removeFavorite',
                    {_id: id},
                  );
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
                             <Text style={styles.textStyle}>Your wishlist</Text>
                           </View>

                           {this.state.list.map((l, i) => (
                             <ListItem
                               key={i}
                               leftAvatar={{
                                 source: {
                                   uri:
                                     'http://192.168.1.213:8082/' + l.gameImage,
                                 },
                                 rounded: false,
                               }}
                               title={l.name}
                               subtitle={l.details}
                               bottomDivider
                               rightIcon={
                                 <AntDesign
                                   name="heart"
                                   color="red"
                                    onPress={()=>{
                                      console.log("hi")
                                      this.unfavorite(l._id)}}
                                 />
                               }
                             />
                           ))}
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
