import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const WriterCard = ({ title, cover, category, rating }) => {
  return (
    <View style={styles.card}>
      {/* Image de couverture */}
      <Image source={cover} style={styles.image} />

      {/* Titre */}
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {/* Catégorie et note (optionnels) */}
      <View style={styles.categoryRatingContainer}>
        {category && <Text style={styles.category}>{category}</Text>}
        {rating && <Text style={styles.rating}>⭐ {rating}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: 130,
    height: 200,
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "100%",
  },

  categoryRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    flexShrink: 1,
  },
  rating: {
    fontSize: 12,
    color: "#f5a623",
    fontWeight: "bold",
  },
});

export default WriterCard;