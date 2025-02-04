import React, { useState, useRef } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar"; // Import du module SearchBar
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CreateEvents from "./CreateEvents"; // Assure-toi d'importer ton composant CreateEvent

export default function FindEvents({ navigation }) {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.event.likes);
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [latitude, setLatitude] = useState(48.8566);
  const [longitude, setLongitude] = useState(2.3522);
  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);  // État pour afficher ou non CreateEvent
  const mapRef = useRef(null);

  const handleSearchPlace = async () => {
    if (!city.trim()) {
      Alert.alert("Erreur", "Veuillez entrer une localisation");
      return;
    }

    try {
      const apiKey = process.env.EXPO_PUBLIC_MAP_API_KEY;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        Alert.alert("Erreur", "Localisation introuvable");
        return;
      }

      const backend = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
      const eventResponse = await fetch(`${backend}/events/searchevent/${city}`);
      const eventData = await eventResponse.json();

      const { lat, lng } = data.results[0].geometry;
      setLatitude(parseFloat(lat));
      setLongitude(parseFloat(lng));
      setEvents(eventData);

      navigation.navigate("Map", {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        events: eventData,
      });
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la recherche.");
    }
  };

  // Fonction pour afficher CreateEvent
  const handleAddPress = () => {
    setIsCreateEventVisible(true); // Affiche CreateEvent
  };

  // Si CreateEvent doit être affiché, on rend CreateEvent
  if (isCreateEventVisible) {
    return <CreateEvents />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <SearchBar
        city={city}
        setCity={setCity}
        handleSearchPlace={handleSearchPlace}
        onFiltersPress={() => {}}
        onAddPress={handleAddPress}  // Passer la fonction de gestion du bouton "+" à SearchBar
      />
      
      <MapView provider={PROVIDER_DEFAULT} style={styles.map} region={region} ref={mapRef} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
