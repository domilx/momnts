import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from 'expo-haptics';
import AntIcon from "react-native-vector-icons/AntDesign";


const HelpScreen = () => {
  const navigation = useNavigation();

  const AccordionItem = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleAccordion = () => {
      setExpanded(!expanded);
    };
  
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleAccordion} style={styles.itemHeader}>
          
          <Text style={styles.itemHeaderText}>{title}</Text>
          
        </TouchableOpacity>
        

        {expanded && <Text style={styles.itemContentText}>{content}</Text>}
      </View>
    );
  };

  //return to profile page 
  const handleReturn = () => {
    navigation.goBack();
  };


  return (

    <View style={styles.container}>

      <View style={styles.titleView}>

        <View style={styles.top}>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
          <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
          </TouchableOpacity>
          <Text style={styles.title}>Help</Text>
        </View>


   
   </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemHeader: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  itemHeaderText: {
    fontWeight: 'bold',
  },
  itemContentText: {
    marginTop: 4,
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 4,
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D6E0D9',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: 20,
  },
  settingChunk: {
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    backgroundColor: '#D6E0D9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  toggleContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D6E0D9',
  },
  chunkTitle : {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
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

export default HelpScreen;