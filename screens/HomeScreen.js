import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deleteEvent } from "../reducers/event";
import UserSettings from "../components/Users/UserSettings";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Svg,
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { logout } from "../reducers/user";

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
  console.log("Événements dans le store:", addedEvents);

  const [isParameterVisible, setIsParameterVisible] = useState(false);
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

  const toggleParameter = () => {
    setIsParameterVisible(!isParameterVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(85, 0, 255, 0.1)",
            "rgba(85, 0, 255, 0.2)",
            "rgba(45, 118, 230, 0.3)",
            "rgba(21, 187, 216, 0.4)",
            "rgba(21, 187, 216, 0.01)",
          ]}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleParameter}>
            <Image
  source={
    user?.avatar
      ? { uri: user.avatar }
      : require("../assets/DragonAdulte.png")
  }
  style={styles.avatar}
/>

            </TouchableOpacity>
            <View style={styles.welcomeContainer}>
  <Svg height="30" width="200">
    <Defs>
      <SvgLinearGradient id="textGradient" x1="0" y1="1" x2="0" y2="0">
        <Stop offset="0" stopColor="#5500FF" stopOpacity="1" />
        <Stop offset="1" stopColor="#15BBD8" stopOpacity="1" />
      </SvgLinearGradient>
    </Defs>
    <SvgText
      x="0"
      y="25"
      fontSize="20"
      fontWeight="bold"
      fill="url(#textGradient)"
      fontFamily="Poppins"
    >
      Hello {user?.username || "Utilisateur"}
    </SvgText>
  </Svg>
</View>

          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.sectionContainer}>
              <Text style={styles.textSection}>Lectures en cours</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {story ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ReadStory", { story })}
                  >
                    <Image
                      source={
                        story.coverImage
                          ? { uri: story.coverImage }
                          : defaultImage
                      }
                      style={styles.book}
                      resizeMode="cover"
                    />
                    <Text>{story.title}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text>Aucune lecture en cours.</Text>
                )}
              </ScrollView>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.textSection}>Dernières histoires</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {allStories.length > 0 ? (
                  allStories.map((story, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("ReadStory", { story })
                      }
                    >
                      <View style={styles.card}>
                        <Image
                          source={
                            story.coverImage
                              ? { uri: story.coverImage }
                              : defaultImage
                          }
                          style={styles.book}
                          resizeMode="cover"
                        />
                        <Text style={styles.cardTitle}>{story.title}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text>Aucune histoire trouvée.</Text>
                )}
              </ScrollView>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.textSection}>Mes évènements</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {addedEvents.length > 0 ? (
                  addedEvents.map((event, index) => (
                    <View key={index}>
                      <Text>{event.title}</Text>
                      <Text>
                        {event.date?.day
                          ? new Date(event.date.day).toLocaleDateString()
                          : "Date non renseignée"}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text>Aucun événement trouvé.</Text>
                )}
              </ScrollView>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.textSection}>Articles favoris</Text>
              <Text>Aucun article favori pour le moment.</Text>
            </View>
          </ScrollView>
        </LinearGradient>
        <Modal
          visible={isParameterVisible}
          onRequestClose={toggleParameter}
          animationType="slide"
          transparent={true}
        >
          <UserSettings
            visible={isParameterVisible}
            onClose={toggleParameter}
            user={user}
            onLogout={handleLogout}
          />
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  welcomeContainer: {
    marginLeft: 10, // To make the text closer to the avatar
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcome: {
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins",
  },
  bold: {
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 40,
  },
  textSection: {
    fontSize: 17,
    fontWeight: "normal",
    marginBottom: 10,
    fontFamily: "Poppins",
    color: "rgba(85, 0, 255, 1)",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 130,
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  book: {
    width: 110,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
