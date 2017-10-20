
import React from 'react'
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native'

function Wrap({ item, navigate }) {

  return (
    <TouchableHighlight onPress={() => { navigate('Details', { topic_id: item.id }) }}>
      <View style={styles.list}>
        <View style={styles.header}>
          <View style={[styles[item.tab], styles.tab]} >
            <Text style={styles.sort}>1</Text>
          </View>
          <Text numberOfLines={1} style={styles.h3}>{item.title}</Text>
        </View >
        <View style={styles.content}>
        <Image source={require('../../assets/images/user.png')} style={styles.avatar} />
          <View style={styles.info}>
            <View style={styles.p}>
              <Text style={styles.name}>请投票...</Text>
              <View style={styles.status}>
                <Text style={[styles.b, styles.reply]}>{item.submitPerson} / </Text>
                <Text style={styles.b}>共{item.totalperson}</Text>
              </View> 
            </View>
            <View style={styles.p}>
              {/* <Text style={styles.time}>2017/9/10</Text> */}
              <Text style={styles.time}>{item.submitDate}</Text>
            </View>
          </View>
        </View>
      </View >
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0'
  },

  header: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  tab: {
    marginRight: 10,
    paddingTop: 5,
    paddingLeft: 6,
    paddingBottom: 5,
    paddingRight: 6,
    borderRadius: 3,
  },

  sort: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  h3: {
    flex: 1,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: 'bold',
  },

  top: {
    backgroundColor: '#e74c3c',
  },

  ask: {
    backgroundColor: '#3498db',
  },

  good: {
    backgroundColor: '#e67e22',
  },

  share: {
    backgroundColor: '#1abc9c',
  },

  job: {
    backgroundColor: '#6A8FFF',
  },

  dev: {
    backgroundColor: '#7A86A2',
  },

  default: {
    backgroundColor: '#e7e7e7',
  },

  content: {
    paddingTop: 10,
    flexDirection: 'row'
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e7e7e7',
  },

  info: {
    flex: 1,
  },

  p: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },

  status: {
    flexDirection: 'row',
  },

  name: {
    fontSize: 12,
  },

  time: {
    fontSize: 12,
  },

  b: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  reply: {
    color: '#42b983',
  }
});

export default Wrap
