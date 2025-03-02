Comment intégrer CardAuthor et CardNoAuthor pour une flatList ou pas

Exemple :

import React from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import CardAuthor from "../modules/CardAuthor";
import CardNoAuthor from "../modules/CardNoAuthor";

// **Données fictives pour tester**
const storiesByGenre = [
  { id: "1", title: "L’épée du Crépuscule", genre: "Fantasy", author: "Alice Martin", rating: 4.7, cover: require("../assets/jinx.jpg") },
  { id: "2", title: "Cybernetic Dawn", genre: "Science-Fiction", author: "Marc Dubois", rating: 4.5, cover: require("../assets/jinx.jpg") },
  { id: "3", title: "L’énigme du 8e étage", genre: "Policier", author: "Sophie Durant", rating: 4.2, cover: require("../assets/jinx.jpg") },
];

export default function CardIntegrationScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* FLATLIST AVEC TOUTES LES INFORMATIONS (Carte avec Auteur, Genre, Note) */}
      <View>
        <FlatList
          data={storiesByGenre}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />} // Espacement entre les cartes
          renderItem={({ item }) => (
            <CardAuthor
              title={item.title}  // Vérifie que "title" est bien défini dans ton API
              cover={item.cover}  //  Si c'est une URL, remplace par `cover={{ uri: item.cover }}`
              genre={item.genre}
              author={item.author}
              rating={item.rating}
            />
          )}
        />
      </View>

      {/*FLATLIST AVEC SEULEMENT L’IMAGE ET LE TITRE */}
      <View>
        <FlatList
          data={storiesByGenre}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <CardNoAuthor
              title={item.title} 
              cover={item.cover}
            />
          )}
        />
      </View>

      {/* AFFICHAGE SANS FLATLIST (Cartes alignées en colonne) */}

      <View style={styles.cardColumn}>
        <CardAuthor title="Titre 1" cover={require("../assets/jinx.jpg")} genre="Fantasy" author="Alice Martin" rating={4.7} />
        <CardAuthor title="Titre 2" cover={require("../assets/jinx.jpg")} genre="Science-Fiction" author="Marc Dubois" rating={4.5} />
      </View>

      {/*  AFFICHAGE SANS FLATLIST (Cartes alignées en ligne) */}

      <View style={styles.cardRow}>
        <CardAuthor title="Titre 1" cover={require("../assets/jinx.jpg")} genre="Fantasy" author="Alice Martin" rating={4.7} />
        <CardAuthor title="Titre 2" cover={require("../assets/jinx.jpg")} genre="Science-Fiction" author="Marc Dubois" rating={4.5} />
      </View>
    </ScrollView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8F5F2",
  },
  flatListContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  cardColumn: {
    flexDirection: "column", 
    alignItems: "center", 
    gap: 15, 
    marginTop: 20
  },
  cardRow: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20
  },
});

C est un exemple de comment importer les modules et modifier leur css si besoin avec différents cas de figure. Ne pas mettre tout ca dans le styleSheet, c est un exemple pour différentes situations.