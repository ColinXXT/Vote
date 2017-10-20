import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TextInput, RefreshControl, Button, Image, StatusBar, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import RadioModal from 'react-native-radio-master';
import Setting from '../config/setting';
import BaseServiceApiNet from '../utils/baseServiceApiNet';

const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20
const defaultInputWidth = width - 40

export default class Details extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        language:'',
        item:'',
        initItem:'',
        initId:'',
        datas:''
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams,navigate } = navigation;
    const { params } = navigation.state;
    return {
      headerTitle: '话题',
      headerRight: (
        <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerTouch} onPress={() => navigation.state.params.navigatePress()}>
          <Image style={[styles.headerBtn, styles.headerImg]} source={require('../assets/images/public.png')} resizeMode='contain' />
        </TouchableOpacity>
      </View>
      )
    };
  };
	componentDidMount() {
    this.props.navigation.setParams({navigatePress:this.submitVote,navigation:this.props.navigation,that:this})
  }
  componentWillMount() {
    //请求details数据
    const datas= [
        {
          "selecteId": 13,
          "content": "苹果",
          "selected": false
        },
        {
          "selecteId": 14,
          "content": "香蕉",
          "selected": false
        },
        {
          "selecteId": 15,
          "content": "橘子",
          "selected": false
        },
        {
          "selecteId": 16,
          "content": "甜瓜",
          "selected": true
        }
      ]	  
      this.setState({
          datas:datas,
          language:datas[0].selecteId,
          item:datas[0].content,
          initItem:'选项a',
          initId:'0',
      })
  
	}
	submitVote(){
    const{navigate} = this.navigation; 
    if(Setting.isDummy){
         navigate('Home');
				return;
			}
    try {
      let formData = new FormData();
      formData.append("voteId",this.state.language);
      formData.append("content",this.state.item);
      BaseServiceApiNet.sentPublicVote(formData)
      .then((response) => {
        if(true){
          navigate('Home');
        }else{
      //
        }
      })
  } catch(e) {
    alert(e);
    }
  }

  render() {
		const {topic_id } = this.props.navigation.state.params;
    return (     
        <View style={{padding:20,flex:1,flexDirection:'column'}}>
				    <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>
				     你选择的是:<Text style={{color:'#ff0000'}}>{this.state.item}</Text>	 
				    </Text>	 
				    <Text style={{backgroundColor:'#ffffff',color:'#414141',padding:5,}}>	 
            选中的水果的标识为：<Text style={{color:'#ff0000'}}>{this.state.language}</Text>
				    </Text>
				    <RadioModal
					  options={{id:'selecteId',value:'content',disabled:'selected'}}
						innerStyle={{width:(width-80)/2}}
						txtColor={'#000000'}
						noneColor={'#efefef'}
						selectedValue={this.state.language}
						onValueChange={(id,item) => this.setState({language: id,item:item})}
						seledImg={require('../assets/images/selected.png')}
						selImg={require('../assets/images/select.png')}
						selnoneImg={require('../assets/images/selectnone.png')}
						dataOption={this.state.datas}
						style={{ flexDirection:'row',
							  flexWrap:'wrap',
							  alignItems:'flex-start',
							  flex:1,
							  backgroundColor:'#ffffff',padding:5,marginTop:10
							  }} 
				      />
				</View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 44,
        backgroundColor: '#FFFFFF',
      },
    
      scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
    
      headerLeft: {
        width: 80,
        marginLeft: 15
      },
    
      connect: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
      },
    
      reply: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
      },
    
      total: {
        color: '#42b983',
        fontWeight: 'bold',
      },
    
      inputView: {
        position: 'absolute',
        bottom: 0,
      },
    
      contentTouch: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      contentImg: {
        width: 24,
        height: 24,
      },
    
      contentView: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
      },
    
      input: {
        width: defaultInputWidth,
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
      },
    
      commentTouch: {
        height: 30,
      },
      titleCom:{
		marginBottom:5,
	},
	seltedImgs:{
		width:14,
		height:14,
		marginRight:8,
	},
	emailH:{
	 height:28,
	 textAlignVertical:'center',
	 marginRight:10,
	 color:'#141414',
	 fontSize:12,
	},
	inputs:{
		width:width*0.5,
		borderWidth:1,
		borderColor:'#dfdfdf',
		borderRadius:3,
		height:28,
		padding:0,
		paddingLeft:5,
		paddingRight:5,
		marginBottom:10,
		fontSize:12,
	},
	closeBtns:{
		position:'absolute',
		width:14,
		height:14,
		right:10,
		top:7,
	},
	headLog:{
	  backgroundColor:'#e6454a',
	  color:'#ffffff',
	  height:28,
	  textAlignVertical:'center',
	  textAlign:'center'
	},
	border1:{
		borderWidth:1,
		borderColor:'#dfdfdf',
	},
	borderR:{
		borderRightWidth:1,
		borderRightColor:'#dfdfdf',
	},
	borderL:{
		borderLeftWidth:1,
		borderLeftColor:'#dfdfdf',
	},
	eleMess:{
		paddingLeft:10,
		paddingRight:10,
		height:24,
		fontSize:12,
		color:'#ffffff',
		backgroundColor:'#f8cb43',
		borderRadius:3,
		textAlignVertical:'center',
		textAlign:'center',
		width:80,
	},
	electronicTip:{
		width:(width-40)/5,
		flexDirection:'row',
		justifyContent:'center',
		paddingTop:10,
		paddingBottom:10,
	},
	lineRow:{
		backgroundColor:'#ffffff',
		borderRadius:3,
		flexDirection:'row',
		flex:1,
		marginBottom:15,
		padding:10,
		alignItems:'center',
		justifyContent:'space-between',
		flexWrap:'wrap',
		alignItems: 'flex-start',
		
	},
	lineRowB:{
		backgroundColor:'#ffffff',
		borderRadius:3,
		flexDirection:'row',
		flex:1,
		marginBottom:15,
		paddingLeft:10,
		paddingRight:10,
		alignItems:'center',
	},
	inner3:{
		width:(width-40)/3,
		fontSize:12,
		color:'#141414'
	},
	innerS:{
		flexDirection:'row',
        flex:1,
		fontSize:12,
		color:'#141414'
	},
	flex1:{
		flex:1
	},
	flexRow:{

	   flexDirection:'row',
	 },
	flexVer:{
		flexDirection:'column',
	},
	Jcenter:{
		justifyContent:'center',
	},
	Acenter:{
		alignItems:'center',
	},
	BE:{
		justifyContent:'space-between'
	},
	Textcenter:{
		textAlign:'center',
	},
	TextCenterVer:{
		textAlignVertical:'center',
	},
	backCGray:{
	  backgroundColor:'#dfdfdf'
    },
	backWhite:{
		backgroundColor:'#ffffff',
	},
	borderRadius5:{
		borderRadius:5,
	},
	borderRadius3:{
		borderRadius:3,
	},
	horLine:{
		flexDirection:'row',
		flex:1,		
		flexWrap:'wrap',
		alignItems: 'flex-start',
		marginBottom:10,
		},
	paddlr10:{
	   paddingLeft:10,
	   paddingRight:10,
    },
	marginB10:{
		marginBottom:10,
	},
	colorRed:{
	   color:'#b40e12',
	},
	colorBlack:{
	   color:'#141414',
	},
	colorYellow:{
	   color:'#f8cb43', 
	},
	color999:{
	   color:'#999999',
	},
	colorWhite:{
	   color:'#ffffff',
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
});


