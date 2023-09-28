// CustomMarker.js
import React from 'react';
import { View, Text,  StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PostMaker = ({  }) => (
    
    <View style={styles.container}>
      <View style={styles.settingChunk}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <Image style={styles.avatar} source={require('../profile-image.jpg')} />
              <Text style={styles.sectionHeading}>username</Text>
              <Icon name="chevron-right" size={25} color="gray" style={styles.arrow} />
          </TouchableOpacity>
      </View>
    </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,   
  },
  settingChunk: {
    backgroundColor: 'rgba(21, 21, 23, 0.7)',
    borderRadius: 10,
    
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,  
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '600',  
    color: '#fdfdff',
    marginLeft: 10,
  },

})


export default PostMaker;
