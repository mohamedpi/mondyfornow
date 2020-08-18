import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ProfileScreen from './profile/index'
export default class Profile extends Component {
  goToEdit() {
    Actions.Edit();
  }

  render() {
    return (
      <View style={styles.container}>
<ProfileScreen/>
        {/* <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={require('../assets/profile.jpg')}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>DeathEater17</Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.goToEdit();
              }}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Search History</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#708090',
    height: 200,
    borderBottomLeftRadius: 200,
    borderBottomEndRadius: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'red',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00b5ec',
  },
  textStyle: {
    paddingHorizontal: 15,
    marginVertical: 15,
    fontFamily: 'GlueGun-GW8Z',
    fontSize: 25,
    color: '#dce0e9',
  },
});
