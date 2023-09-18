import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";

import * as Haptics from 'expo-haptics';


const AboutUsScreen = () => {
  const navigation = useNavigation();

  //Default states
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [ArEnabled, setArEnabled] = useState(false);

  
  
//Handle Notification Selection
  const toggleNotifications = () => {
    setNotificationsEnabled(prevState => !prevState);
  };

//Handle Location Selection
  const toggleLocation = () => {
    setLocationEnabled(prevState => !prevState);
  };

//Handle Ar Selection
  const toggleAR = () => {
    setArEnabled(prevState => !prevState);
  };

  //return to profile page 
  const handleReturn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.goBack();
  };



  return (

    <View style={styles.container}>

      <View style={styles.titleView}>

        <View style={styles.top}>
          <TouchableOpacity activeOpacity={1} onPress={handleReturn} style={styles.iconContainer}>
          <AntIcon name="arrowleft" size={25} color="#D6E0D9" />
          </TouchableOpacity>
          <Text style={styles.title}>About Us</Text>
        </View>
 


        <ScrollView style={styles.toggleContainer}>

         <Text style={styles.aboutText}>sLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus ligula a semper commodo. Nullam sit amet dui euismod, imperdiet erat sed, egestas sapien. Praesent facilisis viverra tortor, ac porta nisl vehicula nec. Aliquam turpis orci, ornare non mi at, consectetur faucibus orci. In ut sodales tellus. Donec bibendum commodo leo, eu fringilla odio interdum non. Sed sed dolor condimentum sapien consectetur cursus id vel lacus. Curabitur eget dolor porttitor, tristique tellus posuere, imperdiet est.

         Integer ex turpis, tristique feugiat lacus id, aliquam vehicula dolor. Donec at eros ornare, pharetra nisi in, malesuada ex. Donec vulputate libero eu tempus porttitor. Nulla sed feugiat felis. Cras finibus velit ut ex cursus, vitae sodales lorem dapibus. Integer quis felis viverra, tincidunt nibh eget, iaculis sapien. Morbi facilisis, mauris vel elementum blandit, nisi augue accumsan tellus, eu luctus magna eros sodales urna. Aliquam id egestas felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut blandit mauris a lorem euismod, ac efficitur purus finibus. Donec nisi leo, pulvinar id dui vitae, molestie venenatis orci. Sed erat nunc, venenatis at elementum ut, pretium ac lorem. Morbi dui leo, posuere quis libero et, sodales pellentesque eros. Vestibulum non ultrices urna, mattis viverra augue. Cras quis imperdiet dui. Integer vel erat at ipsum fringilla tempor.

         Quisque vitae scelerisque dolor. Nam mi dolor, maximus ac ex quis, convallis facilisis elit. Pellentesque ultrices venenatis lectus quis gravida. Vestibulum sagittis mauris velit, et ornare ex bibendum quis. Cras quis auctor mi, id lobortis enim. Aliquam euismod fringilla nibh, et ultrices arcu scelerisque at. Phasellus iaculis dolor non erat condimentum dapibus. Sed eleifend sapien enim, id egestas leo congue non. Aliquam gravida tortor sed nisi suscipit, et vulputate odio cursus. Suspendisse ut feugiat nulla. Quisque at orci ligula. Etiam diam eros, sagittis et arcu id, cursus rutrum felis. Mauris consequat velit eu accumsan ullamcorper. Quisque dictum porttitor sapien at mollis. Curabitur et sapien bibendum, consequat metus a, dignissim nibh. Integer maximus metus sed suscipit pharetra.

         Integer sed augue est. Nam et lorem et lorem facilisis aliquam eu sit amet quam. Nam ut vulputate purus, sed tempus nisl. Praesent interdum felis sit amet sollicitudin consequat. Curabitur auctor interdum mauris a mollis. In hac habitasse platea dictumst. Vestibulum sem tortor, pharetra ut condimentum non, interdum ac erat. In hac habitasse platea dictumst. Fusce dui odio, porttitor id fermentum bibendum, mattis non urna. Cras accumsan porta ligula at ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla urna ante, congue sed fringilla ac, rutrum eu sem.

         Phasellus commodo nulla id ipsum finibus malesuada. Phasellus scelerisque viverra tempus. Duis porta aliquet nulla. Etiam quis faucibus odio. In felis arcu, sagittis vitae odio non, hendrerit condimentum ante. Etiam egestas sed dui at hendrerit. Duis ut arcu id lorem sagittis maximus non in augue. Nam a sem lorem. Ut arcu neque, feugiat vel diam vitae, blandit finibus libero. Mauris vel ante molestie, mattis mauris quis, tincidunt velit. Sed nulla justo, tristique eu ex in, maximus tempus urna. Sed vel ante eu ligula imperdiet tristique ut id metus. In malesuada auctor condimentum. Proin cursus turpis eu mattis ultrices.
         </Text>

        </ScrollView>

    <Text style={styles.footerText}>
        domi & Nathan™
    </Text>
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
  aboutText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D6E0D9',
  },
  iconContainer: {
    alignItems: 'flex-start',
  },
  toggleContainer: {
    marginTop: 30,
    marginHorizontal: 20,
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

export default AboutUsScreen;