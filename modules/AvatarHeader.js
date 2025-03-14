import React, { useState } from "react";
import { View, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux"; // Import de useSelector
import UserSettings from "../components/Users/UserSettings";

const AvatarHeader = ({ onLogout, style }) => {
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
              : require("../assets/jinx.jpg")
          }
          style={[styles.avatar, style]} // Fusion du style existant avec la prop `style`
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
    width: 50, // Taille par défaut
    height: 50, // Taille par défaut
    borderRadius: 35,
  },
});

export default AvatarHeader;
