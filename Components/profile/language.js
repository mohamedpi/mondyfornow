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
} from 'react-native';
import RadioButton from 'react-native-radio-button';
import {ListItem} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class Languages extends Component {
                 constructor() {
                   super();
                   this.state = {
                     language: 'en',
                     isSelectedEN: true,
                     isSelectedFR: false,
                   };
                 }

                 goToProfile() {
                   Actions.profile();
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
