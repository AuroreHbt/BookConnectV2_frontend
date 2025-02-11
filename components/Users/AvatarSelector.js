import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const avatars = [
  require("../../assets/BearGirl.png"),
  require("../../assets/DragonAdulte.png"),
  require("../../assets/DragonJunior.png"),
  require("../../assets/explorateur.png"),
];

const AvatarSelector = ({ onAvatarSelected }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Fonction pour ouvrir la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Résultat ImagePicker :", result);

    // Vérifier que `result.assets` existe et contient une image
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newAvatar = { uri: result.assets[0].uri };
      setSelectedAvatar(newAvatar);
      onAvatarSelected(newAvatar);
      console.log("Nouvel avatar sélectionné :", newAvatar);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre avatar</Text>

      {/* ScrollView pour défiler horizontalement */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {avatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedAvatar(avatar);
              onAvatarSelected(avatar);
              console.log("Avatar sélectionné :", avatar);
            }}
          >
            <Image
              source={avatar}
              style={[
                styles.avatar,
                selectedAvatar === avatar && styles.selected,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bouton d'importation */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <LinearGradient
          colors={["rgba(21, 187, 216, 0.7)", "rgba(85, 0, 255, 0.7)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.7 }}
          style={styles.gradient}
        >
          <Text style={styles.uploadText}>Importer une photo</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Affichage de l'avatar sélectionné uniquement si `selectedAvatar` est valide */}
      {selectedAvatar && (
        <Image
          source={
            selectedAvatar.uri ? { uri: selectedAvatar.uri } : selectedAvatar
          }
          style={styles.preview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(50, 50, 50, 0.9)", // Fond gris foncé légèrement transparent
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // Texte en blanc
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#fff",
  },
  uploadButton: {
    width: "80%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  gradient: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  uploadText: {
    color: "#fff", // Texte en blanc
    fontSize: 16,
    fontWeight: "bold",
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default AvatarSelector;
