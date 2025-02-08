import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/user"; 

const defaultImage = require("../../assets/avatar1.jpg");

const UserSettings = ({ visible, onClose, user }) => {
  const dispatch = useDispatch();
  const slideAnim = useState(new Animated.Value(-300))[0]; // Animation du slide-in

  // Effet d'ouverture et de fermeture
  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
          {/* HEADER AVEC AVATAR */}
          <View style={styles.header}>
            <Image source={user?.avatar ? { uri: user.avatar } : defaultImage} style={styles.avatar} />
            <Text style={styles.userName}>{user?.username || "Utilisateur"}</Text>
          </View>

          {/* OPTIONS DE SETTINGS */}
          <TouchableOpacity style={styles.option} onPress={() => alert("Changer ma photo")}>
            <Icon name="camera" size={20} color="#6A2D99" />
            <Text style={styles.optionText}>Changer ma photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => alert("Modifier mon profil")}>
            <Icon name="edit" size={20} color="#6A2D99" />
            <Text style={styles.optionText}>Modifier mon profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => alert("Mes achats")}>
            <Icon name="shopping-cart" size={20} color="#6A2D99" />
            <Text style={styles.optionText}>Mes achats</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Icon name="sign-out" size={20} color="red" />
            <Text style={[styles.optionText, { color: "red" }]}>Déconnexion</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default UserSettings;
