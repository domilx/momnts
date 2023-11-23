import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from "expo-haptics";

const ControlPanel = () => {
  const navigation = useNavigation();

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
    navigation.navigate("Settings");
  };

  const handleArView = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
    navigation.navigate("CameraView");
  };

  const handleFriends = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
    navigation.navigate("Friends");
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
        <TouchableOpacity onPress={handleSettings} style={{ marginBottom: 10 }}>
          <MatIcon name="cog" size={25} color="#D6E0D9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFriends} style={{ marginBottom: 10 }}>
          <MatIcon name="account-group" size={25} color="#D6E0D9" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleArView} style={{ marginBottom: 10 }}>
          <MatIcon name="cube-scan" size={25} color="#D6E0D9" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MatIcon name="rocket-launch" size={25} color="#D6E0D9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "rgba(21, 21, 23, 0.8)",
    alignItems: "center",
    alignContent: "column",
    justifyContent: "center",
    width: "76%",
  },
});

export default ControlPanel;
