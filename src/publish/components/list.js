import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Dimensions, TouchableOpacity, FlatList,ScrollView } from 'react-native';

export default class AddList extends Component {
    constructor(props) {
        super(props);
            this.state = {
            items: [
            ],
            doms:null,
            content:''

        }
    }
    delItem() {
        let items = this.state.items;
        this.state.doms = <View></View>
        this.setState({items:items});
    };
    render() {
        const { tab, content } = this.props;
        const { height } = Dimensions.get('window');
        const textareaHeight = height - 64 - 74 - 35 - 260;
        var doms = this.state.doms || <View style={styles.titleView}>
        <TextInput style={styles.input}
        value={content}                                             
        placeholder='输入内容'
        underlineColorAndroid="transparent"
        onChangeText={(content) => { this.setState({ content:content }) }}
        ></TextInput>
        <TouchableOpacity onPress={() => { this.delItem() }}>
            <View style={styles.tabView}>
            <Text>Del</Text>
            </View>
        </TouchableOpacity>
        </View>
        return (         
            doms
        );
    }
}

const styles = StyleSheet.create({
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
        textAlign: 'left',
        textAlignVertical: 'top',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
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
});
