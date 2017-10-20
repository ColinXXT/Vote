import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity,Alert } from 'react-native'
import BaseServiceApiNet from '../utils/baseServiceApiNet';
import Setting from '../config/setting';
export default class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      text: '' ,
      isLoading:false, 
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: 'Vote',
      headerLeft: null,
      headerRight: null,
    };

  };

  _onLogin = (userName,password) => {
    const { navigate } = this.props.navigation;
    if(Setting.isDummy){
      navigate('Home');
      return;
    }
    if(this.state.isLoading==true){
      return;
    }
    this.setState({
      isLoading:true
    });
    try {
        BaseServiceApiNet.getUserInfo()
        .then((response) => {
           this.setState({
             isLoading:false
           });
           if(Object.is(response.userName, userName) && Object.is(response.password, password)){
            navigate('Home');
          }else{
            Alert.alert("错误提示","请输入有效的工号或者密码",[{text:"重新输入"}]);
          }
        })
    } catch(e) {
      alert(e);
      this.setState({
         isLoading:false
      });
    }
  }

  render() {
    const { loading, navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode='contain' />
        </View>
        <Text style={styles.label}>用户名</Text> 
        <View style={styles.inputView}>         
          <TextInput style={styles.input}
            value={this.state.username}
            placeholder='员工工号'
            underlineColorAndroid="transparent"
            onChangeText={(username) => { this.setState({ username }) }}
          />
        </View>
        <Text style={styles.label}>密码</Text>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            value={this.state.password}
            placeholder='输入密码'
            underlineColorAndroid="transparent"
            onChangeText={(password) => { this.setState({ password }) }}
          />
        </View>
        <ActivityIndicator  animating={this.state.isLoading}  />
        <TouchableOpacity animating={this.state.isLoading} style={styles.loginBtn} onPress={() => { this._onLogin(this.state.username,this.state.password) }}>
          <Text style={styles.login}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },

  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },

  logoView: {
    alignItems: 'center',
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: '#282828',
  },

  logo: {
    width: 200,
  },

  inputView: {
    height: 44,
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },

  loginBtn: {
    padding: 15,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079FD',
  },

  login: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
  },
});
