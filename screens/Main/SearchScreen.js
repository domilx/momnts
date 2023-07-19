import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView, Image, TextInput } from "react-native";
import { Input } from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';


const EditProfileScreen = () => {
  const navigation = useNavigation();


  const handleReturn = () => {
    navigation.goBack();
  };

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    // Implement your search logic here.
    // You can use this function to filter data or perform API calls based on the search text.
  };


  return (

    <View style={styles.container}>

      <View style={styles.titleView}>

        <View style={styles.top}>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
            <Icon name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <TextInput
        style={styles.input}
        paddingLeft={30}
        placeholder="Search"
        placeholderTextColor="#D6E0D9"
        value={searchText}
        onChangeText={handleSearch}
        autoCapitalize="none"
        autoCorrect={false}
        width="90%"
      />
        </View>

        <View style={styles.divider} />


        <ScrollView style={styles.toggleContainer}>

          
    </ScrollView>
   </View>

    <Text style={styles.footerText}>
        domi & Nathan™
    </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginTop: 50,
  },
 
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 20,
  },
  
  
  iconContainer: {
    alignItems: 'flex-start',
  },
  
  
  
  footerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7A807C',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  divider: {
    height: 0.3,
    backgroundColor: "#D6E0D9",
    marginVertical: 10,
  },
});

export default EditProfileScreen;