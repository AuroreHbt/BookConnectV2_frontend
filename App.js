import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

// Import des Screens pour la navigation
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import LibraryScreen from './screens/LibraryScreen';
import ShopScreen from './screens/ShopScreen';
import CommunityScreen from './screens/CommunityScreen'; 
import SearchScreen from './components/Stories/SearchScreen';

// Imports pour la nested navigation (stack + tab)
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import du module pour animer les icônes (Ionicons)
import AnimatedIcon from "./modules/AnimatedIcon";


// import pour appliquer un gradient sur les icones actives
import { LinearGradient } from "expo-linear-gradient";

// Imports pour configurer le store redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import story from "./reducers/story";
import event from "./reducers/event";

// Import pour charger la police
import { useFonts } from "expo-font";
// https://docs.expo.dev/versions/latest/sdk/splash-screen/
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: { user, story, event },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// **TAB NAVIGATOR**
function TabNavigator() {
  const ActiveColor = ({ size }) => (
    <LinearGradient
      colors={["rgba(21, 187, 216, 0.7)", "rgba(85, 0, 255, 1)"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ width: size, height: size }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName = "";

          if (route.name === "Accueil") {
            iconName = focused ? "home" : "home-outline"; // Maison pleine si active, outline si inactive
          } else if (route.name === "Evènements") {
            iconName = focused ? "calendar-sharp" : "calendar-outline"; // Calendrier plein si active, outline si inactive
          } else if (route.name === "Histoires") {
            iconName = focused ? "library" : "library-outline"; // livres ou livre seul : book ou book-outline
          } else if (route.name === "Achats") {
            iconName = focused ? "cart" : "cart-outline"; // Caddie plein si active, outline si inactive
          } else if (route.name === "Communauté") {
            iconName = focused ? "people" : "people-outline"; // Deux persos pleins si active, outline si inactive
          }

          // Icônes de la bibliotheque Ionicons appelée via le module AnimatedIcon
          return (
            <AnimatedIcon
              focused={focused}
              iconName={iconName} // props "iconName" provenant du module "AnimatedIcon" (= composant). Si on laisse "name", les icones ne sont pas affichées car la props est incorrecte.
              size={size * 1}
              ActiveColor={ActiveColor} // Passe le composant ActiveColor, pas le résultat de son appel
              inactiveColor="rgba(85, 0, 255, 1)" // remplace la propriété tabBarInactiveTintColor: "rgba(85, 0, 255, 1)"
            />
          );
        },
        headerShown: false,
        tabBarStyle: { position: "absolute" },
        tabBarLabel: () => null, // Suppression des libellés sous les icônes
        tabBarBackground: () => <View style={styles.container} />,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Evènements" component={EventScreen} />
      <Tab.Screen name="Histoires" component={LibraryScreen} />
      <Tab.Screen name="Achats" component={ShopScreen} />
      <Tab.Screen name="Communauté" component={CommunityScreen} />
    </Tab.Navigator>
  );
}

// **APP PRINCIPALE**
export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: "rgba(255, 255, 255, 1)", // white
    alignItems: "center",
    justifyContent: "center",
  },
});
