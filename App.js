import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// Import des Screens pour la navigation
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import LibraryScreen from './screens/LibraryScreen';
import ShopScreen from './screens/ShopScreen';
import CommunityScreen from './screens/CommunityScreen'; 

// Imports pour la nested navigation (stack + tab)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import pour les icônes (Ionicons)
import { Ionicons } from '@expo/vector-icons';

// Imports pour LinearGradient
import { LinearGradient } from 'expo-linear-gradient';

// Imports pour configurer le store redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import story from './reducers/story';
import event from './reducers/event';

// Import pour charger la police
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: { user, story, event },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// **TAB NAVIGATOR**
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Accueil') iconName = 'home-outline'; // Maison
          else if (route.name === 'Evènements') iconName = 'calendar-outline'; // Calendrier
          else if (route.name === 'Histoires') iconName = 'book-outline'; // Livre
          else if (route.name === 'Achats') iconName = 'cart-outline'; // Panier
          else if (route.name === 'Communauté') iconName = 'people-outline'; // Trois bonhommes

          // Création du dégradé sur le contour de l'icône
          return (
            <LinearGradient
              colors={['rgba(21, 187, 216, 1)', 'rgba(85, 0, 255, 1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.iconGradient, { width: size, height: size, borderRadius: size / 2 }]}
            >
              <Ionicons name={iconName} size={size} color="white" />
            </LinearGradient>
          );
        },
        headerShown: false,
        tabBarActiveTintColor: 'rgba(21, 187, 216, 1)',
        tabBarInactiveTintColor: 'rgba(85, 0, 255, 1)',
        tabBarStyle: { position: 'absolute' },
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
    'Pacifico-Regular': require('./assets/fonts/Pacifico-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: 'rgba(238, 236, 232, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,  // Ajouter un peu de padding pour le contour
    borderWidth: 2, // Définir une bordure
    borderColor: 'transparent', // Eviter une bordure visible non dégradée
  },
});
