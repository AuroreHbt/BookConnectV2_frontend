import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Keyboard, Dimensions } from "react-native";
import { logout } from "../reducers/user";
import Svg, { Path, Defs, Stop, LinearGradient, Rect } from "react-native-svg";
import AvatarHeader from "../modules/AvatarHeader";
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");
const defaultImage = require("../assets/image-livre-defaut.jpg");
const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function HomeScreen({ navigation }) {
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const story = useSelector((state) => state.story.value);
  const addedEvents = useSelector((state) => state.event.events);
  const [allStories, setAllStories] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/stories/laststories`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setAllStories(data.stories);
        }
      });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Rectangle arrondi avec gradient et ombre */}
        <Svg height={height * 0.24} width="97%" style={styles.headerRectangle}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="rgba(21, 187, 216, 1)" />
              <Stop offset="100%" stopColor="rgba(162, 0, 255, 1)" />
            </LinearGradient>
          </Defs>
          <Rect x="2.0%" y="0" width="95%" height="100%" rx="20" ry="20" fill="url(#gradient)" />
        </Svg>

        {/* Marque-page blanc avec ombre */}
        <Svg height={50} width={60} style={[styles.bookmark, styles.bookmarkShadow]} viewBox="0 0 60 90">
          <Path d="M0,0 L60,0 L60,80 L30,60 L0,80 Z" fill="#ffffff" />
        </Svg>

        {/* Avatar et bouton de paramètres */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity>
              <AvatarHeader onLogout={handleLogout} style={styles.avatar} />
              <FontAwesome style={styles.editButton} name="pencil" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>Hello {user?.username || "Utilisateur"}</Text>
        </View>
      </View>

      {/* Contenu sous le header */}
      <ScrollView style={styles.scrollContent}>
        <View style={styles.sectionContainer}>
          <Text style={styles.textSection}>📖 Lectures en cours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {story ? (
              <TouchableOpacity onPress={() => navigation.navigate("ReadStory", { story })}>
                <View style={styles.cardSmall}>
                  <Image source={story.coverImage ? { uri: story.coverImage } : defaultImage} style={styles.bookSmall} resizeMode="cover" />
                  <Text style={styles.cardTitle}>{story.title}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noData}>Aucune lecture en cours.</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.textSection}>📚 Dernières histoires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allStories.length > 0 ? (
              allStories.map((story, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate("ReadStory", { story })}>
                  <View style={styles.cardSmall}>
                    <Image source={story.coverImage ? { uri: story.coverImage } : defaultImage} style={styles.bookSmall} resizeMode="cover" />
                    <Text style={styles.cardTitle}>{story.title}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noData}>Aucune histoire trouvée.</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.textSection}>📅 Mes événements</Text>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {addedEvents.length > 0 ? (
              addedEvents.map((event, index) => (
                <View key={index} style={styles.cardSmall}>
                  <Text style={styles.cardTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date?.day ? new Date(event.date.day).toLocaleDateString() : "Date non renseignée"}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>Aucun événement trouvé.</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
    paddingTop: 40, // Espacement pour les informations du téléphone
  },
  headerRectangle: {
    marginTop: 40, // Plus d'espace pour éviter de chevaucher les informations du téléphone
    width: "97%", // Largeur ajustée
    height: height * 0.18, // Hauteur responsive
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    zIndex: 0,
  },
  avatarContainer: {
    position: "absolute",
    top: height * 0.08, // Ajuste l'avatar avec plus d'espace
    alignItems: "center",
    zIndex: 2,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    borderRadius: 60,
    width: 105,
    height: 105,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  editButton: {
    position: "absolute",
    bottom: 15,
    right: 8,
    backgroundColor: "rgba(55, 23, 114, 0)",
    borderRadius: 50,
    padding: 5,
  },
  bookmark: {
    position: "absolute",
    top: height * 0.05, // Réajusté pour être plus proche du centre du rectangle
    right: 30, // Positionné plus près du bord droit
    zIndex: 1,
  },
  bookmarkShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeText: {
    fontSize: width * 0.06,
    fontWeight: "400",
    color: "rgb(255, 255, 255)",
    marginTop: 8,
  },
  scrollContent: {
    marginTop: height * 0.26, // Décale le contenu pour qu'il ne soit pas caché par le header
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  textSection: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#001f3f",
    marginBottom: 10,
  },
  cardSmall: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.25,
    height: width * 0.35,
    justifyContent: "space-between",
    margin: 8,
    marginTop: 6,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.90)",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bookSmall: {
    width: "97%",
    height: "70%",
    marginBottom: 3,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: width * 0.035,
    color: "#001f3f",
    textAlign: "center",
  },
  eventDate: {
    fontSize: width * 0.03,
    color: "#001f3f",
    textAlign: "center",
  },
  noData: {
    color: "#001f3f",
    fontStyle: "italic",
  },
});
