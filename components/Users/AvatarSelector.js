import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../reducers/user";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const AvatarSelector = ({ onAvatarSelected, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatars, setAvatars] = useState([]);

  // Chargement des avatars existants sur Cloudinary
  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/users/avatars`);
      const data = await response.json();
      if (data.avatars && Array.isArray(data.avatars)) {
        setAvatars(data.avatars);
      } else {
        Alert.alert("Erreur", "Impossible de récupérer les avatars.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de contacter le serveur.");
    }
  };

  // Fonction pour obtenir une signature sécurisée depuis le backend
  const getUploadSignature = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/users/uploadAvatar`);
      return await response.json();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'obtenir la signature pour Cloudinary.");
      return null;
    }
  };

  // Fonction pour uploader l'image sur Cloudinary
  const uploadImageToCloudinary = async (imageUri) => {
    const sigData = await getUploadSignature();
    if (!sigData) return null;

    const fileName = imageUri.split("/").pop();
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const mimeType = fileExtension === "png" ? "image/png" : "image/jpeg";

    const formData = new FormData();
    formData.append("file", { uri: imageUri, name: fileName, type: mimeType });
    formData.append("upload_preset", sigData.upload_preset);
    formData.append("folder", "avatars");
    formData.append("signature", sigData.signature);
    formData.append("timestamp", sigData.timestamp);
    formData.append("api_key", sigData.api_key);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      Alert.alert("Erreur", "Échec de l'upload sur Cloudinary.");
      return null;
    }
  };

  // Fonction pour envoyer l’URL Cloudinary au backend et mettre à jour l'utilisateur
  const updateAvatarOnServer = async (cloudinaryUrl) => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/users/updateAvatar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, avatarUrl: cloudinaryUrl }),
      });
      const data = await response.json();
      if (data.result && data.avatarUrl) {
        dispatch(updateAvatar({ avatarUrl: data.avatarUrl }));
        setSelectedAvatar({ uri: data.avatarUrl });
        if (onAvatarSelected) onAvatarSelected({ avatarUrl: data.avatarUrl });
        fetchAvatars();
        Alert.alert("Succès", "Avatar mis à jour.");
      } else {
        Alert.alert("Erreur", data.error || "Échec de la mise à jour.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la mise à jour.");
    }
  };

  // Fonction pour sélectionner une image depuis la galerie
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Erreur", "Permission à la galerie refusée.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const imageUri = result.assets[0].uri;
      const cloudinaryUrl = await uploadImageToCloudinary(imageUri);
      if (cloudinaryUrl) updateAvatarOnServer(cloudinaryUrl);
    } else {
      Alert.alert("Erreur", "Aucune image sélectionnée.");
    }
  };

  // Fonction pour sélectionner un avatar existant
  const handleAvatarPress = (uri) => {
    setSelectedAvatar({ uri });
    dispatch(updateAvatar({ avatarUrl: uri }));
    if (onAvatarSelected) onAvatarSelected({ avatarUrl: uri });
    Alert.alert("Succès", "Avatar sélectionné.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Choisissez votre avatar</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {avatars.length > 0 ? (
          avatars.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => handleAvatarPress(uri)}>
              <Image
                source={{ uri }}
                style={[
                  styles.avatar,
                  selectedAvatar?.uri === uri && styles.selected,
                ]}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>Chargement des avatars...</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <LinearGradient colors={["#15BBD8", "#5500FF"]} style={styles.gradient}>
          <Text style={styles.uploadText}>Importer une photo</Text>
        </LinearGradient>
      </TouchableOpacity>
      {selectedAvatar && (
        <Image source={{ uri: selectedAvatar.uri }} style={styles.preview} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#323232",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#15BBD8",
    borderRadius: 20,
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 100,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    height: 120,
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginHorizontal: 10 },
  selected: { borderWidth: 3, borderColor: "#fff" },
  uploadButton: { width: "80%", borderRadius: 10, overflow: "hidden", marginTop: 20 },
  gradient: { paddingVertical: 12, alignItems: "center", borderRadius: 10 },
  uploadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  loadingText: { color: "#fff", fontSize: 16 },
});

export default AvatarSelector;
