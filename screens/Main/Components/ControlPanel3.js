import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  Callout,
  AnimatedRegion,
} from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";

const ControlPanel = () => {
  const navigation = useNavigation();

  const handleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <TouchableOpacity onPress={handleSearch}>
          <MatIcon name="magnify" size={25} color="#D6E0D9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "rgba(21, 21, 23, 0.7)",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  Profile: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 50,
  },
  controlPanelTop: {
    position: "absolute",
    top: 40,
    right: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  controlPanelBottom: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlButton: {
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 7,
    marginRight: 7,
  },
  controlButtonText: {
    color: "#D6E0D9",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ControlPanel;
