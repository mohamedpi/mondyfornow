import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  Alert,
} from 'react-native';
import {Avatar, ListItem, Icon, Accessory} from 'react-native-elements';
import {Container, Content, Form, Text, View, H3} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Languages extends Component {
  goToProfile() {
    Actions.profile();
  }

  async submit() {
   if(this.state.feedback!="")
    {try {
      const id = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      this.setState({id,token});
      try {
        const resp = await axios.get(
          `http://192.168.1.37:8082/user/getUser/?id=${id}`,
        );
        console.log(resp.data);
        this.setState({
          email: resp.data.email,
        });
      } catch (error) {
        console.log(error+"get");
      }

      try {
            const resp = await axios({
              method: 'post',
              url: 'http://192.168.1.37:8082/profile/feedback',
              data: {id: id, email: this.state.email,feedback:this.state.feedback},
              headers: {
                'auth-token': token,
              },
            });
        console.log(resp.data)
        if(resp.status==200){
            Alert.alert("Your feedback has been sent, thank you! ")
            Actions.profile();
        }
      } catch (error) {
        console.log(error+"post");
      }
    } catch (error) {
      console.log(error);
    }
}else{this.setState({isEmpty:true})}
  }

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      email: '',
      isEmpty: false,
      token:'',
    };
  }

  render() {
    const empty = 'Your feedback is empty';
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Container style={styles.container}>
              <Content padder>
                <View style={{flex: 1, alignItems: 'center'}}></View>
                <Form>
                  <View style={{height: screenHeight * 0.04}}></View>
                  <H3 style={styles.profileHeaderStyles}>
                    Give Us Your FeedBack
                  </H3>

                  {this.state.isEmpty ? (
                    <Text style={{color: 'red'}}>{empty}</Text>
                  ) : null}

                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                      placeholder="Type something"
                      placeholderTextColor="grey"
                      numberOfLines={10}
                      multiline={true}
                      onChangeText={(feedback) => this.setState({feedback})}
                    />
                  </View>
                  <View style={styles.buttons}>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      style={[styles.buttonContainer, styles.EditButton]}
                      onPress={() => this.submit()}>
                      <Text style={styles.loginText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      style={[styles.buttonContainer, styles.CancelButton]}
                      onPress={() => {
                        this.goToProfile();
                      }}>
                      <Text style={styles.loginText}>Cancel</Text>
                    </TouchableHighlight>
                  </View>
                </Form>
              </Content>
            </Container>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  profileHeaderStyles: {
    alignSelf: 'center',
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
  userImage: {
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: screenHeight * 0.2,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  icon: {
    marginLeft: screenWidth * 0.04,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: screenWidth * 0.3,
    borderRadius: 30,
  },
  EditButton: {
    backgroundColor: '#00b5ec',
    alignSelf: 'flex-start',
  },

  CancelButton: {
    backgroundColor: '#00b5ec',
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textAreaContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    width: screenWidth,
  },
  textArea: {
    // height: 150,
    justifyContent: 'flex-start',
  },
});
