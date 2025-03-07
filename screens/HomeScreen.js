import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Keyboard, Dimensions } from "react-native";
import { logout } from "../reducers/user";
import Svg, { Path, Defs, Stop, LinearGradient, Rect } from "react-native-svg";
import AvatarHeader from "../modules/AvatarHeader";

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
        {/* Rectangle arrondi avec gradient */}
        <Svg height={height * 0.28} width="100%" style={styles.headerRectangle}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="rgba(21, 187, 216, 1)" />
              <Stop offset="100%" stopColor="rgba(162, 0, 255, 1)" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" rx="20" ry="20" fill="url(#gradient)" />
        </Svg>

        {/* Marque-page blanc */}
        <Svg height={90} width={80} style={styles.bookmark} viewBox="0 0 60 90">
          <Path d="M0,0 L60,0 L60,80 L30,60 L0,80 Z" fill="#ffffff" /> {/* Marque-page en blanc */}
        </Svg>

        <View style={styles.avatarContainer}>
          <AvatarHeader onLogout={handleLogout} style={styles.avatar} />
          <Text style={styles.welcomeText}>Hello {user?.username || "Utilisateur"}</Text>
        </View>
      </View>

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
  },
  headerRectangle: {
    marginTop: -20,
    width: "80%",
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  avatarContainer: {
    position: "absolute",
    top: height * 0.09, // 10% de la hauteur de l'écran
    alignItems: "center",
  },
  bookmark: {
    position: "absolute",
    top: 0,
    right: 30,
    zIndex: 1,
  },
  welcomeText: {
    fontSize: width * 0.06, // 6% de la largeur de l'écran
    fontWeight: "400",
    color: "rgb(255, 255, 255)",
    marginTop: 8,
  },
  scrollContent: {
    marginTop: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  textSection: {
    fontSize: width * 0.05, // 5% de la largeur de l'écran
    fontWeight: "bold",
    color: "#001f3f",
    marginBottom: 10,
  },
  cardSmall: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.25, // 25% de la largeur de l'écran
    height: width * 0.35, // 35% de la largeur de l'écran
    justifyContent: "space-between",
    margin: 8,
    marginTop: 6,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bookSmall: {
    width: "95%",
    height: "70%",
    marginBottom: 3,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: width * 0.035, // 3.5% de la largeur de l'écran
    color: "#001f3f",
    textAlign: "center",
  },
  eventDate: {
    fontSize: width * 0.03, // 3% de la largeur de l'écran
    color: "#001f3f",
    textAlign: "center",
  },
  noData: {
    color: "#001f3f",
    fontStyle: "italic",
  },
});