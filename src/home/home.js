import React, { PureComponent } from 'react';
import Wrap from './components/Wrap';
import { StyleSheet, AlertIOS, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native'
import Setting from '../config/setting';
import BaseServiceApiNet from '../utils/baseServiceApiNet';
const { width } = Dimensions.get('window');
export default class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false, //初始化不刷新
            data: "",
            text: "",//跳转的行 ,
            loadNew:"下拉刷新",
            _newData:""
        }
    }
 
    _sourceData = [
        {
            id: '0',
            title: '请选择你最爱吃的水果',
            totalperson: '100',
            submitPerson: '2',
            submitDate: '2017/10/10'
        },
        {
            id: '1',
            title: '关于调查问卷食品安全',
            totalperson: '100',
            submitPerson: '29',
            submitDate: '2017/10/11'
        }
    ]
    _newData = [{
        id: '0',
        title: '请选择你最爱吃的水果',
        totalperson: '100',
        submitPerson: '2',
        submitDate: '2017/10/10'
    },
    {
        id: '1',
        title: '关于调查问卷食品安全',
        totalperson: '100',
        submitPerson: '29',
        submitDate: '2017/10/11'
    },
    {
        id: '3',
        title: '关于最喜爱歌手',
        totalperson: '100',
        submitPerson: '29',
        submitDate: '2017/10/20'
    }];
    static navigationOptions = ({ navigation }) => {
        const { state, setParams, navigate } = navigation;
        return {
            headerRight: (
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerTouch} onPress={() => navigation.state.params.navigatePress()}>
                        <Text style={styles.exitText}>退出</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: null,
            headerTitle: '投票列表',
        }
    };
    LogoffButton(){
      const{navigate} = this.navigation; 
        AlertIOS.alert('提示', '确定退出？', [
            {
              text: '取消',
              onPress: function() {
                console.log('取消按钮点击');
              }
            },
            {
              text: '确认',
              onPress: function() {
                {navigate('Login')}
              }
            },
          ])
    }  
    componentDidMount() {
        this.props.navigation.setParams({navigatePress:this.LogoffButton,navigation:this.props.navigation})
        const{navigate} = this.props.navigation; 
            if(Setting.isDummy){
                this.setState({
                data:this._sourceData,
                _newData:this._newData
            })
             return;
          }
        try {
            BaseServiceApiNet.sentPublicVote()
            .then((response) => {
              if(Object.is(null, response.sourceData)){
                this.setState({
                    data:this._sourceData
                })
              }else{
                //
              }
            })
        } catch(e) {
          alert(e);
          }    
    }
  
    _onEndReached = () => {
        //请求新数据
        setTimeout(() => {
            this.setState((state) => ({
                data: this._newData
            }));
        }, 3000)
    }
    _footer = () => (
        <Text style={{fontSize: 14, alignSelf: 'center',marginTop:10, color:"grey"}}>{this.state.loadNew}</Text>
      )
    render() {
        const { data, page, tab } = this.props
        const { navigate } = this.props.navigation;
        const tabs = [{ key: 'all', value: '全部' }]
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <FlatList
                    style={{ width: width }}
                    ref="_flatlist"
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.id}
                    ListFooterComponent={this._footer}//footer尾部组件
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this._onEndReached();
                        this.setState({ refreshing: true })//开始刷新
                        setTimeout(() => {
                            this.setState({ refreshing: false, loadNew:"暂时没有更多新数据"});
                        }, 5000);
                    }}
                    renderItem={({ item }) => <Wrap navigate={navigate} item={item} />}
                />
                <TouchableOpacity style={styles.pubilshBox} onPress={() => { navigate('Publish') }}>
                    <Image style={styles.pubilsh} source={require('../assets/images/add.png')} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { tab, page, data, loading } = state.home;
    return { tab, page, data, loading };
}

function mapDispatchToProps(dispatch) {
    return {
        init() {
            dispatch({
                type: 'home/init',
            });
        },
        query(params) {
            dispatch({
                type: 'home/query',
                payload: params,
            });
        },
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },

    headerLeft: {
        height: 44,
        width: 80,
        marginLeft: 15
    },

    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    headerTouch: {
        height: 30,
        justifyContent: 'center',
    },
    exitText: {
        color: 'white',
    },
    headerBtn: {
        flex: 1,
        width: 30,
        height: 30,
        marginRight: 15
    },

    iconBtn: {
        width: 25,
        height: 25,
    },

    headerImg: {
        borderRadius: 15,
    },

    pubilshBox: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },

    pubilsh: {
        width: 44,
        height: 44,
    },

    tabsView: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        borderColor: '#F0F0F0',
    },

    tabView: {
        padding: 15,
    },

    tabText: {
        fontSize: 14,
    },

    tabActive: {
        borderBottomWidth: 1.5,
        borderColor: '#4181DE',
    },

    textActive: {
        fontWeight: 'bold',
        color: '#4181DE',
    }

});

