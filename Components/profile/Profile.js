import React, {Component} from 'react';
import {
  ScrollView,
  Switch,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import {Avatar, ListItem, Icon, Accessory} from 'react-native-elements';
import PropTypes from 'prop-types';

import BaseIcon from './Icon';
import Chevron from './Chevron';
import InfoText from './InfoText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import Axios from 'axios';
import ImagePicker from 'react-native-image-picker';

class SettingsScreen extends Component {
  // static propTypes = {
  //   avatar: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   navigation: PropTypes.object.isRequired,
  //   emails: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       email: PropTypes.string.isRequired,
  //     })
  //   ).isRequired,
  // }

  async componentDidMount() {
    try {
      const id = await AsyncStorage.getItem('userId');
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      console.log(name);
      this.setState({userEmail: email, userName: name});
    } catch (error) {
      console.log(error);
    }
  }
  constructor() {
    super();
    this.state = {
      pushNotifications: true,
      darkMode: false,
      userName: '',
      userEmail: '',
      photo: null,
    };
  }

  onPressOptions = () => {
    this.props.navigation.navigate('options');
  };

  onChangePushNotifications = () => {
    this.setState((state) => ({
      pushNotifications: !state.pushNotifications,
    }));
  };

  onChangeDarkMode = () => {
    this.setState((state) => ({
      darkMode: !state.darkMode,
    }));
  };

  goToLanguages() {
    Actions.language();
  }
  goToEdit() {
    Actions.Edit();
  }

  logOut() {
    Actions.Splash({type: 'reset'});
  }

  gotToCreditCard() {
    Actions.CreditCard();
  }

  goToAboutUs() {
    Actions.AboutUs();
  }

  takePic() {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('response', response);

      if (response.uri) {
        this.setState({photo: response});
      }
    });
        let uri = this.state.photo.uri;
        let formData = new FormData();
        let filename = uri.split('/').pop();
        console.log(filename);
        formData.append('userImage', {
          uri: this.state.photo.uri,
          type: this.state.photo.type,
          name: this.state.photo.fileName,
        });
 const header = {
   Accept: 'application/json',
   'content-type': 'multipart/form-data',
 };
 fetch('http://192.168.43.124:8082/profile/updatePhoto', {
   method: 'POST',
   headers: header,
   body: formData,
 })
   .then((response) => response.json())
   .then((res) => console.log(res))
   .catch((err) => console.log('err', err));
  }

  render() {
    const {avatar} = this.props;
    const name = this.state.userName;
    const email = this.state.userEmail;
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              accessory={{style: {backgroundColor: "red"}}}
              onPress={() => {
                this.takePic();
              }}
              rounded
              size="large"
              source={{
                uri: this.state.photo == null ? avatar : this.state.photo.uri,
              }}>
              <Accessory />
            </Avatar>
          </View>
          <View>
            <Text style={{fontSize: 16}}>{name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}>
              {email}
            </Text>
          </View>
          <View style={{height: 10}}></View>
          <TouchableOpacity onPress={() => this.logOut()}>
            <View style={styles.logOutView}>
              <Text style={styles.logOutText}>Log out</Text>
              <Icon
                name="logout"
                type="material-community"
                color="#D1D1D6"
                containerStyle={{marginLeft: 10, width: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <InfoText text="Account" />
        <View>
          <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                trackColor={{true: 'red', false: 'black'}}
                thumbColor="#FFFFFF"
                onValueChange={this.onChangePushNotifications}
                value={this.state.pushNotifications}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: 'black',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />
          <ListItem
            hideChevron
            title="Dark Mode"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                trackColor={{true: 'red', false: 'black'}}
                thumbColor="#FFFFFF"
                // thumbColor={[
                //   Platform.OS == 'ios'
                //     ? '#FFFFFF'
                //     : this.state.darkMode
                //     ? '#7ab8e1'
                //     : '#ffffff',
                // ]}
                onValueChange={this.onChangeDarkMode}
                value={this.state.darkMode}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: 'black',
                }}
                icon={{
                  type: 'material',
                  name: 'highlight',
                }}
              />
            }
          />
          <ListItem
            // chevron
            title="Credit Card info"
            onPress={() => this.gotToCreditCard()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: 'black'}}
                icon={{
                  type: 'font-awesome',
                  name: 'money',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Edit Profile"
            onPress={() => this.goToEdit()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: 'black'}}
                icon={{
                  type: 'material',
                  name: 'edit',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{fontSize: 15}}
            onPress={() => this.goToLanguages()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: 'black'}}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
        <InfoText text="More" />
        <View>
          <ListItem
            title="About US"
            onPress={() => this.goToAboutUs()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: 'black'}}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: 'black'}}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: 'black',
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: 'black',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: 'black',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    // paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  logOutText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    right: -5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  logOutView: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    position: 'relative',
    right: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default SettingsScreen;
