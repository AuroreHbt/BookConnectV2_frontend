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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        {onBackPress && (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name="angle-left" size={30} color="black" style={styles.backIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: screenHeight * 0.015,  // Adapte l'espacement inférieur (~1.5% de la hauteur de l’écran)
    paddingHorizontal: screenWidth * 0.04, // Ajoute un padding horizontal (~4% de la largeur)
},

  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.04, // Espacement horizontal dynamique (~4% de la largeur de l’écran)
},


  backIcon: {
    marginRight: screenWidth * 0.05,
  },
  
  title: {
    fontSize: screenWidth * 0.08, // Taille dynamique (~8% de la largeur de l'écran)
    fontWeight: "bold",
    marginLeft: screenWidth * 0.08, // Marge responsive (~8% de la largeur de l'écran)
    color: "#222",
}

});
