// Module pour le header commum

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarHeader from "./AvatarHeader";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export default function Header({ title, onBackPress }) {
  return (
    <View style={styles.headerContainer}>
      <AvatarHeader onLogout={() => console.log("Déconnexion...")} />
      
      <Text style={styles.title}>{title}</Text>

      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="angle-left" size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Écarte bien les éléments (avatar à gauche, bouton à droite)
    marginBottom: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
  },

  title: {
    flex: 1, // Permet au titre de prendre toute la place disponible
    fontSize: screenWidth * 0.08,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center", // Centre le titre même avec l'avatar et le bouton
  },

  backButton: {
    padding: screenWidth * 0.025, // Zone tactile responsive (~2.5% de la largeur)
  },
});

