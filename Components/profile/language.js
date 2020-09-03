import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  AsyncStorage
} from 'react-native';
import RadioButton from 'react-native-radio-button';
import {ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

export default class Languages extends Component {

async componentDidMount(){
   try {
      const language = await AsyncStorage.getItem('userLanguage');
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('userId');
      this.setState({language,id,token});
      if(language=="en"){
        this.setState({isSelectedEN:true,isSelectedFR:false})
      }else if(language=="fr"){
        this.setState({isSelectedFR: true,isSelectedEN:false});
      }
    } catch (error) {
      console.log(error);
    }
}

                 constructor() {
                   super();
                   this.state = {
                     language: '',
                     isSelectedEN: true,
                     isSelectedFR: false,
                     id:'',
                     token:'',
                   };
                 }

           async      goToProfile() {
                         try {
     const resp = await axios({
            method: 'put',
            url: 'http://192.168.43.173:8082/profile/updateLanguage',
            data: {id: this.state.id, language: this.state.language},
            headers: {
              'auth-token': this.state.token,
            },
          });
        console.log(resp.data.message);
        this.setState({
          language: resp.data.language,
        });
        console.log(resp.status)
        if (resp.status == 200)
          try {
            await AsyncStorage.setItem('userLanguage', this.state.language);
          } catch (error) {
            console.log(error);
          }
        Actions.profile();
      } catch (error) {
        console.log(error+"language");
      }
      
                 }
                 render() {
                   return (
                     <View>
                       <ListItem
                         hideChevron
                         title="English"
                         containerStyle={styles.listItemContainer}
                         rightElement={
                           <RadioButton
                             innerColor="black"
                             outerColor="red"
                             animation={'bounceIn'}
                             isSelected={this.state.isSelectedEN}
                             onPress={() => {
                               this.setState({
                                 isSelectedEN: true,
                                 isSelectedFR: false,
                                 language: 'en',
                               });
                             }}
                           />
                         }
                       />
                       <ListItem
                         hideChevron
                         title="Français"
                         containerStyle={styles.listItemContainer}
                         rightElement={
                           <RadioButton
                             innerColor="black"
                             outerColor="red"
                             animation={'bounceIn'}
                             isSelected={this.state.isSelectedFR}
                             onPress={() => {
                               this.setState({
                                 isSelectedEN: false,
                                 isSelectedFR: true,
                                 language: 'fr',
                               });
                             }}
                           />
                         }
                       />
                       <TouchableOpacity
                         style={styles.appButtonContainer}
                         onPress={() => this.goToProfile()}>
                         <Text style={styles.appButtonText}>Confirm</Text>
                       </TouchableOpacity>
                     </View>
                   );
                 }
               }

const styles = StyleSheet.create({
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width:200,
    alignSelf:"center"
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
