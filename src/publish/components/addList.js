import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, Dimensions, TouchableOpacity, FlatList,ScrollView } from 'react-native';
import List from './list'
export default class AddList extends Component {
    constructor(props) {
        super(props);
            this.state = {
            items: [
            ]
        }
    }

    addItem() {
        let items = this.state.items; 
        let item = {};
        items = [...items, item];                        
        this.setState({ items: items });
    }

    render() {
        const { height } = Dimensions.get('window');
        const textareaHeight = height - 64 - 74 - 35 - 260;
        const { items } = this.state;
        return (
            <ScrollView style={styles.container}>
            {items.map((e,index)=> <List />)}          
            <TouchableOpacity animating={this.state.isLoading} style={styles.loginBtn} onPress={() => { this.addItem() }}>
                <Text style={styles.login}>添加选项</Text>
            </TouchableOpacity>
            </ScrollView>

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
