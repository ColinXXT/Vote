import React, { PureComponent } from 'react'
import { StyleSheet, Alert, View, ScrollView, Text, TextInput, Image, Modal, StatusBar, Dimensions, TouchableOpacity ,TouchableWithoutFeedback} from 'react-native'
import Setting from '../config/setting';
import BaseServiceApiNet from '../utils/baseServiceApiNet';
import AddList from './components/addList';
import Title from './components/title'


export default class Publish extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
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
         navigate('Home',{staffType:'0'});
    }
    return;
  }
  if(Object.is(this.that.state.title) && Object.is(this.that.state.content)){
      try {
        let formData = new FormData();
        formData.append("title",this.state.title);
        formData.append("content",this.state.content);
          BaseServiceApiNet.sentPublicVote(formData)
          .then((response) => {
            console.info(response);
            switch (response.status) {
             case "200":
               this.setState({
                 responseMessage:{
                   
                 }
               });
               navigate('Home',responseMessage={responseMessage});
               break;
            case "500":
               switch(response.body.errorCode){
                 case "U_0100_001":
                 Alert.alert("错误提示","",[{text:"重新提交"}]);
               }
                 break;
             default:
               Alert.alert("错误提示","发送失败",[{text:"重新提交"}]);
           }
          })
    } catch(e) {
      console.log('error ${e}');
      }  
  }else{
    Alert.alert("错误提示","提交数据不能为空");
  }
}

  render() {
    const { loading } = this.props
    const { key } = this.state

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <StatusBar barStyle="light-content" />
        <Title />
        <AddList/>
      </ScrollView >
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    }
})

