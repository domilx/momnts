import React, { useState, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const topAlert = ({ message, icon, title, showNotification }) => {
  const [notificationPosition] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (showNotification) {
      Animated.timing(notificationPosition, {
        toValue: 60,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        hideNotification();
      }, 3000); 
    } else {
      hideNotification();
    }
  }, [showNotification]);

  const hideNotification = () => {
    Animated.timing(notificationPosition, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.notificationContainer}> 
    <Animated.View
      style={[
        styles.settingChunk,
        { transform: [{ translateY: notificationPosition }] },
      ]}
    >
      <TouchableOpacity>
        <View style={styles.settingItem} activeOpacity={0.7}>
          <Icon name={icon} size={30} color="#D6E0D9" />
          <View style={styles.twoText}>
            <Text style={styles.fullName}>{title}</Text>
            <Text style={styles.username}>{message}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.notificationText}></Text>
    </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999, 
    padding: 10,
  },
  notificationText: {
    color: "white", 
    fontSize: 16,
  },
  settingChunk: {
    backgroundColor: "#151517",
    borderRadius: 10,
    paddingTop: 10,
   
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 60,
    resizeMode: "cover",
    marginVertical: 5,
    backgroundColor: "#7A807C",
  },
  twoText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    marginLeft: 10,
  },
  fullName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#D6E0D9",
  },
  username: {
    fontSize:11,
    fontWeight: "500",
    color: "#7A807C",
  },
});

export default topAlert;
