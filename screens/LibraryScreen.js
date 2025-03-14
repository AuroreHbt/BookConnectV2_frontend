import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Keyboard,
  Dimensions,
  StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import SearchStory from '../components/Stories/SearchStory';
import ReadStories from '../components/Stories/ReadStories';
import CreateStories from '../components/Stories/CreateStories';
import ExploreStories from '../components/Stories/ExploreStories'
import WriterPage from '../components/Users/WriterPage';
import SummaryStories from '../components/Stories/SummaryStories'

import AvatarHeader from "../modules/AvatarHeader";
import Header from "../modules/HeaderStory";

const storiesByGenre = [
  { id: "1", genre: "Fantasy", title: "L’épée du Crépuscule", author: "Guillaume Lebrun", rating: 4.7, cover: require("../assets/jinx.jpg") },
  { id: "2", genre: "Science-Fiction", title: "Cybernetic Dawn", author: "Marc Dubois", rating: 4.5, cover: require("../assets/jinx.jpg") },
  { id: "3", genre: "Policier", title: "L’énigme du 8e étage", author: "Sophie Durant", rating: 4.2, cover: require("../assets/jinx.jpg") },
];

const genres = [
  { id: "1", name: "Fantasy", icon: "sword-cross", color: "#6A5ACD" }, 
  { id: "2", name: "Science-Fiction", icon: "robot", color: "#20B2AA" }, 
  { id: "3", name: "Policier", icon: "police-badge", color: "#DC143C" }, 
  { id: "4", name: "Romance", icon: "heart", color: "#FF69B4" }, 
  { id: "5", name: "Horreur", icon: "ghost", color: "#4B0082" }, 
  { id: "6", name: "Historique", icon: "castle", color: "#8B4513" }, 
  { id: "7", name: "Aventure", icon: "treasure-chest", color: "#FF8C00" }, 
  { id: "8", name: "Poésie", icon: "feather", color: "#4682B4" }, 
];

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function LibraryScreen({openSummaryPage}) {
  const [currentComponent, setCurrentComponent] = useState("library");
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [previousScreen, setPreviousScreen] = useState("library");
  const [selectedGenre, setSelectedGenre] = useState(null); // permet de séléctionner les histoires par genre

  useFocusEffect(
    React.useCallback(() => {
      setCurrentComponent("library");
      Keyboard.dismiss(); // Ferme le clavier pour éviter le tremblement
    }, [])
  );

  if (currentComponent === "search") {
    return (
      <SearchStory 
        backLibrary={() => {
          Keyboard.dismiss();
          setTimeout(() => setCurrentComponent("library"), 100);
        }}
        openSummaryPage={(story) => {
          setSelectedStory(story);
          setPreviousScreen("search");
          setCurrentComponent("summary");
        }}
        openWriterPage={(writer) => {
          setSelectedWriter(writer);
          setCurrentComponent("writer");
        }}
      />
    );
  }

  if (currentComponent === "read") {
    return (
      <ReadStories
        story={selectedStory}
        backSearch={() => setCurrentComponent(previousScreen)}
      />
    );
  }

  if (currentComponent === "publish") {
    return <CreateStories backLibrary={() => setCurrentComponent("library")} />;
  }

  if (currentComponent === "writer") {
    return (
      <WriterPage 
        writerName={selectedWriter}
        openSummaryPage={(story) => {
          setSelectedStory(story);
          setPreviousScreen("writer");
          setCurrentComponent("summary");
        }}
        backSearch={() => setCurrentComponent("search")}
      />
    );
  }

  if (currentComponent === "explore") {
    return <ExploreStories
    selectedGenre={selectedGenre}
     backLibrary={() => setCurrentComponent("library")} />;
  }

  if (currentComponent === 'summary') {
    return (
      <SummaryStories selectedStory={selectedStory}
      backLibrary={() => setCurrentComponent(previousScreen)}

       />
    )
  }

  return (
      <View style={[styles.container, { marginBottom: screenHeight * 0.05 }]} >
        <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { flexGrow : 1}]}
        showsVerticalScrollIndicator={false}
        >
        <Header title="Histoire" />
        <View>
          <TouchableOpacity style={styles.searchContainer} onPress={() => setCurrentComponent("search")}>
            <Icon name="search" size={25} color="#000" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Rechercher une histoire</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentComponent("publish")}>
              <Text style={styles.buttonText}>Publier une histoire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explorer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.genreContainer}>
            {genres.map((genre) => (
              <View key={genre.id} style={styles.genreWrapper}>
                <TouchableOpacity style={[styles.genreButton, {backgroundColor: genre.color}]}
                  onPress={()=> {
                    setSelectedGenre(genre.name);
                    setCurrentComponent("explore")
                  }} >
                  <MaterialCommunityIcons name={genre.icon} size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.flatListContainer}>
            <Text style={styles.flatListTitle}>Histoires populaires du jour</Text>
            <FlatList
              data={storiesByGenre}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.storyCard} onPress={() => openSummaryPage}>
                  <Image source={item.cover} style={styles.storyImage} />
                  <View style={styles.storyTextContainer}>
                    <Text style={styles.storyTitle} numberOfLines={2} >{item.title}</Text>
                    <Text style={styles.storyGenre}>{item.genre}</Text>
                  </View>
                  <View style={styles.storySeparator} />
                  <View style={styles.storyAuthorRatingContainer}>
                    <Text style={styles.storyAuthor} numberOfLines={2} > {item.author}</Text>
                    <Text style={styles.storyRating}>⭐ {item.rating}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.flatListContainer}>
            <Text style={styles.flatListTitle}>Histoires récentes</Text>
            <FlatList
              data={storiesByGenre}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.storyCard} onPress={() => openSummaryPage}>
                  <Image source={item.cover} style={styles.storyImage} />
                  <View style={styles.storyTextContainer}>
                    <Text style={styles.storyTitle} numberOfLines={2} >{item.title}</Text>
                    <Text style={styles.storyGenre}>{item.genre}</Text>
                  </View>
                  <View style={styles.storySeparator} />
                  <View style={styles.storyAuthorRatingContainer}>
                    <Text style={styles.storyAuthor} numberOfLines={2} > {item.author}</Text>
                    <Text style={styles.storyRating}>⭐ {item.rating}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
 container: {
        flex: 1,
        paddingHorizontal: screenWidth * 0.04, // Ajuste le padding horizontal selon la largeur de l’écran (~4%)
        paddingVertical: screenHeight * 0.02, // Ajuste le padding vertical (~2%)
        backgroundColor: "#F8F5F2",
        paddingTop: Platform.OS === "android" 
            ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) 
            : screenHeight * 0.05, // Gère l’espace sous la barre de statut de manière adaptative
    },

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F0F0F0",
      borderRadius: screenWidth * 0.06, // Arrondis adaptatifs (6% de la largeur)
      marginTop: screenHeight * 0.03, // Marge haute proportionnelle (3% de la hauteur)
      borderWidth: 1.5,
      borderColor: "#C0C0C0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: screenHeight * 0.005 }, // Ombre responsive
      shadowOpacity: 0.15,
      shadowRadius: screenHeight * 0.008, // Ajuste la portée de l’ombre
      elevation: 4,
      paddingVertical: screenHeight * 0.012, // Ajuste l’épaisseur du champ
      paddingHorizontal: screenWidth * 0.045, // Ajuste l’espace intérieur
  },

  searchIcon: {
    marginRight: screenWidth * 0.02, // Ajuste l’espacement dynamique à 2% de la largeur de l’écran
        marginLeft: screenWidth * 0.015,  // Ajuste aussi le décalage à gauche
  },
  
  searchPlaceholder: {
    flex: 1,
        fontSize: Math.max(screenWidth * 0.04, 14),
        color: '#6D6D72',
        

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    marginTop: 40
  },
  
  button: {
    backgroundColor: "#6C63FF", // Bleu actuel
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 40,
    flex: 1, // Assure qu'ils prennent la même largeur
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5, // Espacement entre les boutons
    borderWidth: 1.5, // Bordure subtile pour éviter l'effet trop "plat"
    borderColor: "#4B4CFF", // Bleu légèrement plus foncé pour contraste
    shadowColor: "#000", // Ombre pour effet 3D
    shadowOffset: { width: 0, height: 4 }, // Ombre portée vers le bas
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Ombre pour Android
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  flatListContainer: {
    marginTop: 40,
  },
  flatListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "#333",
  },

  // **Genres littéraires (icônes rondes)**
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 40,
  },
  
  genreWrapper: {
    alignItems: "center",
    width: "22%",  
    marginBottom: 15,
    padding: 5
  },
  
  genreButton: {
    width: 65,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6, // Ombre pour Android
    shadowColor: "#000", // Couleur de l’ombre
    shadowOffset: { width: 4, height: 4 }, // Ombre plus marquée en bas à droite
    shadowOpacity: 0.4, // Plus visible
    shadowRadius: 6, // Flou plus prononcé
  },
  
  genreIcon: {
    fontSize: 30,
    color: "#fff",
  },
  
  genreText: {
    color: "#333",
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,  // **Assure un bon espacement**
    textAlign: "center",
    width: 100,  // **Évite que le texte soit coupé**
    flexWrap: "wrap"
  },
  

  // **Cartes des histoires (FlatList)**
  storyCard: {
    padding: screenWidth * 0.015, // Ajustement automatique
    borderRadius: screenWidth * 0.03,
    alignItems: "center",
    width: screenWidth * 0.33, // Augmente légèrement pour éviter un effet trop compact
    height: screenHeight * 0.25, // Ajuste légèrement pour un meilleur ratio hauteur/largeur
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
  
  /* storyGenreIcon: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 10,
    elevation: 2,
    zIndex: 10
  }, */ 
  
  storyImage: {
    width: "100%",
    height: 90,  // Taille fixe pour éviter les différences entre les cartes
    borderRadius: 10,
    
  },
  
  storyTextContainer: {
    flex: 1,  // Permet de répartir l’espace entre titre et genre
    justifyContent: "space-between", 
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 5,
},
  
  storyTitle: {
    fontSize: Math.max(screenWidth * 0.035, 12),
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "100%",
    paddingTop: screenHeight * 0.01
  },
  
    storySeparator: {
    width: "80%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },

  storyGenre: {
    fontSize: 12,

    color: "#777",
    textAlign: "center",
    marginTop: 3, // Espacement pour éviter que ça colle au titre
},

  storyAuthorRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 30, // Fixer une hauteur pour l'auteur et la note
  },
  
  storyAuthor: {
    fontSize: 12, // Réduire un peu la taille
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
    width: "90%",
    flexShrink: 1, // Permet de rétrécir si nécessaire
  },
  
  storyRating: {
    fontSize: 12,
    color: "#f5a623",
    fontWeight: "bold",
  },
  
  
});

