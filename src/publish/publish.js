import React, { PureComponent } from 'react'
import { StyleSheet, Alert, View, ScrollView, Text, TextInput, Image, Modal, StatusBar, Dimensions, TouchableOpacity ,TouchableWithoutFeedback} from 'react-native'
import Setting from '../config/setting';
import BaseServiceApiNet from '../utils/baseServiceApiNet';
const { width } = Dimensions.get('window');
const defaultWidth = width - 90 * 2
export default class Publish extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      title: '', 
      content:'',
      visible:false,
      key:'1',
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
  _onSelect = (tab) => {
    // this.props.setTab(tab)
    this.setState({ visible: false,key: tab })
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
    const { params } = this.props.navigation.state
    const { navigate } = this.props.navigation
    const { height } = Dimensions.get('window')
    const textareaHeight = height - 64 - 74 - 35 - 260
    const tabs = [{ key: '1', value: '单选' }, { key: '2', value: '多选' }]
    const tabDefault = { '1': '单选', 'share': '分享', '2': '多选' }
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.titleView}>
            <TextInput style={styles.input}
              value={this.state.title}
              placeholder='输入标题'
              underlineColorAndroid="transparent"
              onChangeText={(title) => { this.setState({title:title}) }}
            />
            <TouchableOpacity onPress={() => { this.setState({ visible: true }) }}>
              <View style={styles.tabView}>
                <Text>{tabDefault[key]}</Text>
              </View>
            </TouchableOpacity>
          </View>
            <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => null}     //修复安卓modal的告警
          >
            <TouchableWithoutFeedback onPress={() => { this.setState({ visible: false }) }}>
              <View style={styles.modalContainer}>
                <View style={styles.modal}>
                  {
                    tabs.map((tab, index) => (
                      <TouchableOpacity key={index} onPress={() => { this._onSelect(tab.key) }}>
                        <View style={styles.rowView}>
                          <Text style={styles.rowText}>{tab.value}</Text>
                        </View>
                        {index != tabs.length - 1 ? <View style={styles.rowLine}></View> : null}
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View style={styles.content}>
          <TextInput style={styles.textarea}
            value={this.state.content}
            multiline={true}
            minHeight={textareaHeight}
            placeholder='输入正文（至少12个字符）'
            underlineColorAndroid="transparent"
            onChangeText={(title) => { this.setState({content:title}) }}
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: defaultWidth,
    borderRadius: 5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  rowView: {
    padding: 16,
  },

  rowLine: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  rowText: {
    textAlign: 'center',
  }
})

