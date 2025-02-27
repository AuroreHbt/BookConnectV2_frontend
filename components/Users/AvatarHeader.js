import React, { useState } from "react";
import { View, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux"; // Import de useSelector
import UserSettings from "./UserSettings";

const AvatarHeader = ({ onLogout }) => {
  const [isParameterVisible, setIsParameterVisible] = useState(false);
  const user = useSelector((state) => state.user.value); // Récupère le user depuis Redux

  const toggleParameter = () => {
    setIsParameterVisible(!isParameterVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleParameter}>
        <Image
          source={
            user?.avatar
              ? { uri: user.avatar }
              : require("../../assets/avatar1.jpg")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Modal
        visible={isParameterVisible}
        onRequestClose={toggleParameter}
        animationType="slide"
        transparent={true}
      >
        <UserSettings
          visible={isParameterVisible}
          onClose={toggleParameter}
          user={user}
          onLogout={onLogout}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default AvatarHeader;
