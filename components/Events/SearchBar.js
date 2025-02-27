import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import AvatarHeader from "../Users/AvatarHeader"; // Import de AvatarHeader

const SearchBar = ({ city, setCity, handleSearchPlace, onFiltersPress, onAddPress }) => {
  return (
    <View style={styles.searchContainer}>
      
      {/* Avatar en haut à gauche */}
      <AvatarHeader />

      <View style={styles.inputWrapper}>
        <FontAwesome name="map-marker" size={20} color="#4B0082" style={styles.inputIcon} />
        <TextInput
          placeholder="Ville ou code postal..."
          onChangeText={(value) => setCity(value)}
          value={city}
          style={styles.inputField}
        />
      </View>
      
      <TouchableOpacity onPress={handleSearchPlace} style={styles.searchButton}>
        <LinearGradient
          colors={["rgba(21, 187, 216, 0.7)", "rgba(85, 0, 255, 0.7)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.7 }}
          style={styles.gradientButton}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Rechercher</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={onFiltersPress} style={styles.filtersButton}>
        <FontAwesome name="sliders" size={20} color="#4B0082" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
        <LinearGradient
          colors={["rgba(21, 187, 216, 0.7)", "rgba(85, 0, 255, 0.7)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.7 }}
          style={styles.gradientButton}
          activeOpacity={0.8}
        >
          <FontAwesome name="plus" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30, // Décalé vers le bas
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10, // Ajoute un espace entre l'avatar et l'input
  },
  
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
  },
  searchButton: {
    marginLeft: 10,
  },
  gradientButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
  },
  filtersButton: {
    marginLeft: 10,
  },
  addButton: {
    marginLeft: 10,
  },
});

export default SearchBar;
