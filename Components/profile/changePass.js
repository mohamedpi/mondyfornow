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

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Languages extends Component {
  goToProfile() {
    Actions.profile();
  }

  //   async componentDidMount() {
  //     try {
  //       const id = await AsyncStorage.getItem('userId');
  //       this.setState({id: id});
  //       try {
  //         const resp = await axios.get(
  //           `http://192.168.1.37:8082/user/getUser/?id=${id}`,
  //         );

  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async submit() {
    try {
      var id = await AsyncStorage.getItem('userId');

      var token = await AsyncStorage.getItem('token');

      if (this.state.password != '') {
        try {
          const res = await axios({
            method: 'post',
            url: 'http://192.168.1.39:8082/profile/verifyPassword',
            data: {id: id, password: this.state.oldpassword},
            headers: {
              'auth-token': token,
            },
          });
          if (res.status == 200) {
            console.log('success password');
            this.setState({passwordSuccess: true});
          }
        } catch (error) {
          if (error.response.status == 401)
            this.setState({passwordSuccess: false});
        }
        if (
          this.state.passwordSuccess == true &&
          this.state.confirmPassword == true
        ) {
         
          try {
            const res = await axios({
              method: 'put',
              url: 'http://192.168.1.39:8082/profile/updatePassword',
              data: {_id: id, password: this.state.newPassword},
              headers: {
                'auth-token': token,
              },
            });
            if (res.status == 200) {
              console.log('success password');
              this.setState({passwordSuccess: true});
            }
          } catch (error) {
            if (error.response.status == 401)
              this.setState({passwordExists: true});
          }
        } else {
          this.setState({passwo: false});
        }
      } else {
        this.setState({passwordSuccess: false});
      }
      if (this.state.passwordSuccess  && this.state.confirmPassword) {
        Actions.profile();
      }
      if(!this.state.confirmPassword)
      this.setState({confirmFalse:true})
    } catch (error) {
      console.log(error);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      newPassword: '',
      passwordExists: false,
      passwordSuccess: true,
      passVisible: true,
      newPassVisible: true,
      passConfirmVisible: true,
      confirmPassword: false,
      confirmFalse:false
    };
  }

  render() {
    const passwordW = 'Please type a correct password';
    const passwordE = 'This is your old password, please change to a new one';
    const passwordC = 'Your new password is not correct';
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Container style={styles.container}>
              <Content padder>
                <View style={{flex: 1, alignItems: 'center'}}></View>
                <Form>
                  <View style={{height: screenHeight * 0.04}}></View>
                  <H3 style={styles.profileHeaderStyles}>Change password</H3>

                  {this.state.passwordExists ? (
                    <Text style={{color: 'red'}}>{passwordE}</Text>
                  ) : null}
                  {!this.state.passwordSuccess ? (
                    <Text style={{color: 'red'}}>{passwordW}</Text>
                  ) : null}
                  {this.state.confirmFalse ? (
                    <Text style={{color: 'red'}}>{passwordC}</Text>
                  ) : null}
        
                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="key"
                      size={screenWidth * 0.08}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Enter your old password"
                      onSubmitEditing={() => this.newPassword.focus()}
                      secureTextEntry={this.state.passVisible}
                      underlineColorAndroid="transparent"
                      onChangeText={(oldpassword) =>
                        this.setState({oldpassword})
                      }
                    />

                    {this.state.passVisible ? (
                      <Icon
                        size={24}
                        color="black"
                        type="font-awesome-5"
                        name="eye"
                        onPress={() =>
                          this.setState({
                            passVisible: !this.state.passVisible,
                          })
                        }></Icon>
                    ) : (
                      <Icon
                        size={24}
                        color="black"
                        type="font-awesome-5"
                        name="eye-slash"
                        onPress={() =>
                          this.setState({
                            passVisible: !this.state.passVisible,
                          })
                        }></Icon>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="key"
                      size={screenWidth * 0.08}
                    />
                    <TextInput
                      style={styles.inputs}
                      ref={(newPassword) => (this.newPassword = newPassword)}
                      placeholder="Enter your new password"
                      onSubmitEditing={() => this.confirmPassword.focus()}
                      secureTextEntry={this.state.newPassVisible}
                      underlineColorAndroid="transparent"
                      onChangeText={(newPassword) =>
                        this.setState({newPassword})
                      }
                    />

                    {this.state.newPassVisible ? (
                      <Icon
                        size={24}
                        color="black"
                        type="font-awesome-5"
                        name="eye"
                        onPress={() =>
                          this.setState({
                            newPassVisible: !this.state.newPassVisible,
                          })
                        }></Icon>
                    ) : (
                      <Icon
                        size={24}
                        color="black"
                        type="font-awesome-5"
                        name="eye-slash"
                        onPress={() =>
                          this.setState({
                            newPassVisible: !this.state.newPassVisible,
                          })
                        }></Icon>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="Safety"
                      size={screenWidth * 0.08}
                      color={!this.state.confirmPassword ? 'red' : 'black'}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Confirm your password"
                      ref={(confirmPassword) =>
                        (this.confirmPassword = confirmPassword)
                      }
                      secureTextEntry={this.state.passConfirmVisible}
                      underlineColorAndroid="transparent"
                      onChangeText={(password) => {
                        console.log(password);
                        if (password !== this.state.newPassword)
                          this.setState({confirmPassword: false});
                        else this.setState({confirmPassword: true});
                      }}
                    />

                    {this.state.passConfirmVisible ? (
                      <Icon
                        size={24}
                        color="black"
                        type="font-awesome-5"
                        name="eye"
                        onPress={() =>
                          this.setState({
                            passConfirmVisible: !this.state.passConfirmVisible,
                          })
                        }></Icon>
                    ) : (
                      <Icon
                        size={24}
                        color="black"
                        type="font-awesome-5"
                        name="eye-slash"
                        onPress={() =>
                          this.setState({
                            passConfirmVisible: !this.state.passConfirmVisible,
                          })
                        }></Icon>
                    )}
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
});
