// Module pour le header commum

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AvatarHeader from "./AvatarHeader";


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
    marginTop: 20,
    marginBottom: 10,
  },
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
