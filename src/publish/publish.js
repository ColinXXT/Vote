import React, { PureComponent } from 'react'
import { StyleSheet, Alert, View, ScrollView, Text, TextInput, Image, Modal, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import Setting from '../config/setting';
import BaseServiceApiNet from '../utils/baseServiceApiNet';
export default class Publish extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      title: '', 
      content:''
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation
    return {
      headerTitle: '新建话题',
      //编辑
      headerRight: (
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerTouch} onPress={() => navigation.state.params.navigatePress()}>
          <Image style={[styles.headerBtn, styles.headerImg]} source={require('../assets/images/public.png')} resizeMode='contain' />
        </TouchableOpacity></View>)
    }
  }

  componentWillReceiveProps(next) {
    const { topic_id, navigation, accesstoken } = this.props;
    if (next.topic_id && next.topic_id !== topic_id) {
      this.props.query({ topic_id: next.topic_id, accesstoken })
      navigation.goBack()
    }
  }

  componentWillUnmount() {
    // this.props.clean()
  }
  componentDidMount() {
    this.props.navigation.setParams({navigatePress:this.publicButton,navigation:this.props.navigation,that:this})
  }
  publicButton(){
    const{navigate} = this.navigation; 
    if(Setting.isDummy){
      if(Object.is("",this.that.state.title) && Object.is("",this.that.state.content)){
        Alert.alert("提交数据不能为空");
    }else{
         navigate('Home');
    }
    return;
  }
    try {
      let formData = new FormData();
      formData.append("title",this.state.title);
      formData.append("content",this.state.content);
      BaseServiceApiNet.sentPublicVote(formData)
      .then((response) => {
        if(Object.is(this.that.state.title) && Object.is(this.that.state.content)){
          {navigate('Home')}
        }else{
          Alert.alert("错误提示","提交数据不能为空");
        }
      })
  } catch(e) {
    alert(e);
    }
  }

  render() {

    const { height } = Dimensions.get('window');
    const textareaHeight = height - 64 - 74 - 35 - 260
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.titleView}>
          <TextInput style={styles.input}
            value={this.state.title}
            placeholder='输入标题'
            underlineColorAndroid="transparent"
            onChangeText={(title) => { this.setState({title:title}) }}
          />
        </View>
        <View style={styles.content}>
        <TextInput style={styles.textarea}
          value={this.state.content}
          multiline={true}
          minHeight={textareaHeight}
          placeholder='输入正文（至少12个字符）'
          underlineColorAndroid="transparent"
          onChangeText={(content) => { this.setState({content:content}) }}
        />
      </View>
      </ScrollView >
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleView: {
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 8,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },

  tabView: {
    flex: 2,
    margin: 3,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 15,
    marginBottom: 0,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  textarea: {
    padding: 0,
    textAlign:'left',
    textAlignVertical:'top',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTouch: {
    height: 30
  },

  headerBtn: {
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 10
  },
})

