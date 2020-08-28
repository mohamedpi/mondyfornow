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

  async componentDidMount() {
    try {
      const id = await AsyncStorage.getItem('userId');
      const language = await AsyncStorage.getItem('userLanguage');
      this.setState({id,language});
      try {
        const resp = await axios.get(
          `http://192.168.1.39:8082/user/getUser/?id=${id}`,
        );
        console.log(resp.data);
        this.setState({
          photo: resp.data.userImage,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async submit() {
    try {
      var id = await AsyncStorage.getItem('userId');

      var token = await AsyncStorage.getItem('token');

      if (this.state.password != '') {
        try {
          const res = await axios({
            method: 'post',
            url: 'http://192.168.1.39:8082/profile/verifyPassword',
            data: {id: id, password: this.state.password},
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
        if (this.state.passwordSuccess) {
          if (this.state.name != '') {
            try {
              //name
              const res = await axios({
                method: 'put',
                url: 'http://192.168.1.39:8082/profile/updateName',
                data: {_id: id, name: this.state.name},
                headers: {
                  'auth-token': token,
                },
              });
              if (res.status == 200) {
                console.log('success name');
                this.setState({
                  nameSuccess: true,
                });
              }
            } catch (error) {
              console.log(error + 'updateName');
            }
          } else {
            this.setState({
              nameSuccess: true,
            });
          }
          //avatar
          if (this.state.avatar != '') {
            try {
              const res = await axios({
                method: 'put',
                url: 'http://192.168.1.39:8082/profile/updateAvatar',
                data: {_id: id, avatar: this.state.avatar},
                headers: {
                  'auth-token': token,
                },
              });
              if (res.status == 200) {
                console.log('success avatar');
                this.setState({
                  avatarSuccess: true,
                });
              }
            } catch (error) {
              console.log(error);
              if (error.response.status == 400)
                this.setState({avatarExists: true});
            }
          } else {
            this.setState({
              avatarSuccess: true,
            });
          }
          //email
          if (this.state.email != '') {
            try {
              const res = await axios({
                method: 'put',
                url: 'http://192.168.1.39:8082/profile/updateEmail',
                data: {_id: id, email: this.state.email},
                headers: {
                  'auth-token': token,
                },
              });
              if (res.status == 200) {
                console.log('success email');
                this.setState({
                  emailSuccess: true,
                });
              }
            } catch (error) {
              console.log(error);
              if (error.response.status == 401)
                this.setState({emailExists: true});
            }
          } else {
            this.setState({
              emailSuccess: true,
            });
          }
          //password

          //profile pic
       if(this.state.photoImported) {  console.log('photoImported' + this.state.photoImported);
          if (this.state.photoImported != null) {
            let uri = this.state.photoImported.uri;
            let formData = new FormData();
            let filename = uri.split('/').pop();
            console.log(filename);
            formData.append('userImage', {
              uri: this.state.photoImported.uri,
              type: this.state.photoImported.type,
              name: this.state.photoImported.fileName,
            });
            formData.append('id', id);
            console.log('formdata' + formData);
            try {
              const res = await axios({
                method: 'put',
                url: 'http://192.168.1.39:8082/profile/updatePhoto',
                data: formData,
                headers: {
                  Accept: 'application/json',
                  'content-type': 'multipart/form-data',
                },
              });
              if (res.status == 200) {
                console.log('success photo');
                this.setState({photoSuccess: true});
              }
            } catch (error) {
              console.log(error);
            }
          }}
          else{this.setState({photoSuccess:true})}
        }
      }else{
        this.setState({passwordSuccess:false})
      }
      const done =
        this.state.passwordSuccess &&
        this.state.avatarSuccess &&
        this.state.nameSuccess &&
        this.state.emailSuccess &&
        this.state.photoSuccess;
      if (done) {
        try {
          if (this.state.name != '')
            await AsyncStorage.setItem('userName', this.state.name);
          if (this.state.email != '')
            await AsyncStorage.setItem('userEmail', this.state.email);
        } catch (error) {
          console.log(error);
        }

        Actions.profile();
      }
    } catch (error) {
      console.log(error + 'storage');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      name: '',
      avatar: '',
      email: '',
      password: '',
      avatarExists: false,
      emailExists: false,
      passwordExists: false,
      nameSuccess: false,
      avatarSuccess: false,
      emailSuccess: false,
      passwordSuccess: true,
      photoSuccess: false,
      photo: null,
      photoImported: null,
      language:''
    };
  }
  async takePic() {
    return new Promise((resolve) => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('response', response);

        if (response.uri) {
          this.setState({photoImported: response});
        }
      });
    });
  }

  render() {
    const avatarE = 'This avatar already exists';
    const emailE = 'This email already exists';
    const passwordE = 'Please type a correct password';
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Container style={styles.container}>
              <Content padder>
                <View style={{flex: 1, alignItems: 'center'}}></View>
                <Form>
                  <View style={{height: screenHeight * 0.04}}></View>
                  <H3 style={styles.profileHeaderStyles}>Edit Profile</H3>
                  <View style={styles.userImage}>
                    {this.state.photoImported != null ? (
                      <Avatar
                        accessory={{
                          style: {backgroundColor: 'red'},
                        }}
                        onPress={() => {
                          this.takePic();
                        }}
                        rounded
                        size="large"
                        source={{
                          uri: this.state.photoImported.uri,
                        }}></Avatar>
                    ) : (
                      <Avatar
                        accessory={{
                          style: {backgroundColor: 'red'},
                        }}
                        onPress={() => {
                          this.takePic();
                        }}
                        rounded
                        size="large"
                        source={{
                          uri: 'http://192.168.1.37:8082/' + this.state.photo,
                        }}></Avatar>
                    )}
                    {/* <Accessory /> */}
                  </View>
                  {this.state.avatarExists ? (
                    <Text style={{color: 'red'}}>{avatarE}</Text>
                  ) : null}
                  {this.state.emailExists ? (
                    <Text style={{color: 'red'}}>{emailE}</Text>
                  ) : null}
                  {!this.state.passwordSuccess ? (
                    <Text style={{color: 'red'}}>{passwordE}</Text>
                  ) : null}
                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="user"
                      size={screenWidth * 0.08}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Name"
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                      onChangeText={(name) => this.setState({name})}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="smileo"
                      size={screenWidth * 0.08}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Avatar"
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                      onChangeText={(avatar) => this.setState({avatar})}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="mail"
                      size={screenWidth * 0.08}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Email"
                      keyboardType="email-address"
                      underlineColorAndroid="transparent"
                      onChangeText={(email) => this.setState({email})}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <AntDesign
                      style={styles.icon}
                      name="key"
                      size={screenWidth * 0.08}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Password"
                      secureTextEntry={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(password) => this.setState({password})}
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
});
