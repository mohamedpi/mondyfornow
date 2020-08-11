import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {List} from 'react-native-paper';
import {Button, ThemeProvider, Card, ListItem} from 'react-native-elements';

function HomeInterface() {
  const hello = () => {
    console.warn('hello');
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
          <View>
            <View>
              <Text style={styles.textStyle}>check our hot list</Text>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/cover.jpg')}></Card>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/clashofclans.jpg')}></Card>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/valorant.jpg')}></Card>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/uncharted4.jpg')}></Card>
              </ScrollView>
            </View>

            <View >
              <Text style={styles.textStyle}>check our new offers</Text>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}>
                <TouchableOpacity>
                  <Card
                    containerStyle={styles.cardStyle}
                    imageStyle={styles.imageStyle}
                    image={require('../assets/dimond1.png')}></Card>
                </TouchableOpacity>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/dimond2.png')}></Card>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/dimond3.png')}></Card>
                <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/dimond4.jpg')}></Card>
              </ScrollView>
            </View>
            <View>
              <Text style={styles.textStyle}>Discounts </Text>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <ListItem 
                containerStyle={styles.listItemContainer}
                key={1}
                leftAvatar={{
                  source: require('../assets/dimond4.jpg'),
                }}
                title=<Text style={styles.listItemTitle}>Welcome</Text>
                subtitle=<Text style={styles.listItemDes}>
                  offer generated at first signUp
                </Text>
                rightSubtitle=<Text style={styles.price}>45$</Text>
                bottomDivider
              />
              <ListItem
                containerStyle={styles.listItemContainer}
                key={2}
                leftAvatar={{
                  source: require('../assets/dimond3.png'),
                }}
                title=<Text style={styles.listItemTitle}>Lucky day</Text>
                subtitle=<Text style={styles.listItemDes}>
                  offer generated on your birthday
                </Text>
                rightSubtitle=<Text style={styles.price}>40$</Text>
                bottomDivider
              />
              <ListItem
                containerStyle={styles.listItemContainer}
                key={3}
                leftAvatar={{
                  source: require('../assets/dimond2.png'),
                }}
                title=<Text style={styles.listItemTitle}>happy year</Text>
                subtitle=<Text style={styles.listItemDes}>
                  offer generated idk when
                </Text>
                rightSubtitle=<Text style={styles.price}>25$</Text>
                bottomDivider
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#121419',
  },
  cardStyle: {
    width: 135,
    height: 135,
    borderRadius: 20,
  },
  imageStyle: {
    width: 135,
    height: 135,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  titleStyle: {
    flex: 1,
    width: 135,
    height: 90,
    marginBottom: 120,
  },
  textStyle: {
    paddingHorizontal: 15,
    marginVertical: 15,
    fontFamily: 'GlueGun-GW8Z',
    fontSize: 25,
    color: '#dce0e9',
  },
  listItemTitle: {
    fontFamily: 'GlueGun-GW8Z',
    fontSize: 15,
    color: '#dce0e9',
  },
  listItemDes: {
    fontSize: 12,
    color: '#dce0e9',
  },
  listItemContainer: {
    backgroundColor: '#121419',
  },
  price: {
    fontFamily: 'GlueGun-GW8Z',
    fontSize: 20,
    color: '#dce0e9',
  },
});
export default HomeInterface;
