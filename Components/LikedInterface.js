import React, {Component} from 'react';
import {View, Text, Image, StyleSheet,ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

const list = [
  {
    name: 'Welcome',
    avatar_url: require('../assets/dimond3.png'),
    subtitle: ' offer generated at first signUp',
  },
  {
    name: 'Lucky day',
    avatar_url: require('../assets/dimond4.jpg'),
    subtitle: 'offer generated on your birthday',
  },
  {
    name: 'Welcome',
    avatar_url: require('../assets/dimond3.png'),
    subtitle: ' offer generated at first signUp',
  },
  {
    name: 'Lucky day',
    avatar_url: require('../assets/dimond4.jpg'),
    subtitle: 'offer generated on your birthday',
  },
  {
    name: 'Welcome',
    avatar_url: require('../assets/dimond3.png'),
    subtitle: ' offer generated at first signUp',
  },
  {
    name: 'Lucky day',
    avatar_url: require('../assets/dimond4.jpg'),
    subtitle: 'offer generated on your birthday',
  },
  {
    name: 'Welcome',
    avatar_url: require('../assets/dimond3.png'),
    subtitle: ' offer generated at first signUp',
  },
  {
    name: 'Lucky day',
    avatar_url: require('../assets/dimond4.jpg'),
    subtitle: 'offer generated on your birthday',
  },
];

export default class LikedInterface extends Component {
  render() {
    return (
      <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.textStyle}>Your wishlist</Text>
          </View>

          {list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                source: {uri: '../assets/dimond3.png'},
                rounded: false,
              }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
              rightIcon={<AntDesign name="heart" color="red" />}
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
