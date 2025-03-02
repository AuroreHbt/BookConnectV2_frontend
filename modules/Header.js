// Module pour le header commum

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Header({ title, onBackPress }) {
  return (
    <View style={styles.headerContainer}>
      <Icon name="user-circle" size={45} color="#b4b4b4" style={styles.profilIcon} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        
        {onBackPress && ( // Afficher l'icône "Retour" seulement si une fonction est passée
          <Icon 
            name="angle-left" 
            size={30} 
            color="black" 
            style={styles.backIcon} 
            onPress={onBackPress} 
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  profilIcon: {},
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 30,
    color: "#222",
  },
});
