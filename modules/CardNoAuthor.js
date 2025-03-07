import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function WriterCard ({ title, cover, category, rating }) {
  return (
    <View style={styles.card}>
      <Image source={cover ? cover : require("../../assets/jinx.jpg")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>{title}</Text>
      </View>
      <View style={styles.categoryRatingContainer}>
        {category && <Text style={styles.category}>{category}</Text>}
        {rating && <Text style={styles.rating}>⭐ {rating}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: screenWidth * 0.02, // Ajustement automatique
        borderRadius: screenWidth * 0.03,
        alignItems: "center",
        width: screenWidth * 0.35, // Augmente légèrement pour éviter un effet trop compact
        height: screenHeight * 0.27, // Ajuste légèrement pour un meilleur ratio hauteur/largeur
        justifyContent: "space-between",
        margin: screenWidth * 0.025,
        backgroundColor: "rgba(255, 255, 255, 0.95)", // Légèrement plus opaque pour une meilleure visibilité
        borderWidth: screenWidth * 0.0015, // Rendre le contour plus fin et responsive
        borderColor: "#DDD", // Légère teinte pour mieux s’intégrer aux designs modernes
        shadowColor: "#000",
        shadowOffset: { width: 0, height: screenHeight * 0.005 }, 
        shadowOpacity: 0.12,
        shadowRadius: screenHeight * 0.01, // Diffusion d’ombre ajustée
        elevation: 4, // Augmente l’élévation pour un meilleur effet de relief sur Android
  },

  image: {
    width: "100%",
    height: screenHeight * 0.12,
    borderRadius: screenWidth * 0.03,
  },

  textContainer: {
    flex: 1,
    minHeight: Math.max(screenHeight * 0.06, 50),  // Fixe une hauteur minimale pour l’alignement
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.03,
    width: "100%",
  },

  title: {
    fontSize: Math.max(screenWidth * 0.035, 12),
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "100%",
    marginTop: screenHeight * 0.01,
  },

  categoryRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: Math.max(screenHeight * 0.04, 30),
    paddingHorizontal: screenWidth * 0.01,
  },

  category: {
    fontSize: Math.max(screenWidth * 0.035, 12),
    color: "#666",
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: 10,
    textAlign: "left",
  },

  rating: {
    fontSize: Math.max(screenWidth * 0.035, 12),
    color: "#f5a623",
    fontWeight: "bold",
  },
});

