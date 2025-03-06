// UserSettings.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux"; 
import { updateAvatar } from "../../reducers/user"; 
import AvatarSelector from "./AvatarSelector"; 
import Logout from "./Logout"; // Importation du composant Logout

const defaultImage = require("../../assets/avatar1.jpg");

const UserSettings = ({ visible, onClose, navigation }) => { // navigation est passé ici
  const dispatch = useDispatch();
  const slideAnim = useState(new Animated.Value(-300))[0];
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const user = useSelector((state) => state.user.value);
  
  const avatarSource = user?.avatar 
  ? { uri: user.avatar }
  : defaultImage;

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
    setShowLogout(true);
  };

  const handleAvatarSelected = (newAvatar) => {
    dispatch(updateAvatar(newAvatar));
    setShowAvatarSelector(false);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.header}>
            <Image source={avatarSource} style={styles.avatar} />
            <Text style={styles.userName}>{user?.username || "Utilisateur"}</Text>
          </View>

          <TouchableOpacity style={styles.option} onPress={() => setShowAvatarSelector(true)}>
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

      {showAvatarSelector && (
        <Modal transparent={true} visible={showAvatarSelector} animationType="slide">
          <AvatarSelector onAvatarSelected={handleAvatarSelected} onClose={() => setShowAvatarSelector(false)} />
        </Modal>
      )}

      {showLogout && (
        <Modal transparent={true} visible={showLogout} animationType="fade">
          <Logout navigation={navigation} /> {/* Passer navigation à Logout */}
        </Modal>
      )}
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
