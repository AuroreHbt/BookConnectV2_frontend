import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// Import des Screens pour la navigation
import LoginScreen from './screens/LoginScreen'; // Composant
import HomeScreen from './screens/HomeScreen'; // Screen
import ExploreScreen from './screens/ExploreScreen';
import CreateScreen from './screens/CreateScreen';
import EventScreen from './screens/EventScreen';
import LibraryScreen from './screens/LibraryScreen';
import ShopScreen from './screens/ShopScreen';

// Imports pour la nested navigation (stack + tab)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import pour les icones
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Imports pour configurer le store redux
import user from './reducers/user';
import story from './reducers/story';
import event from './reducers/event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// https://docs.expo.dev/versions/latest/sdk/font/
// https://docs.expo.dev/develop/user-interface/fonts/
// import pour utliser le hook useFonts pour charger la police
import { useFonts } from 'expo-font';
// import pour empecher le rendu de l'appli tant que la font n'est pas chargée et prête
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: { user, story, event },
})

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// **STACK POUR HOME**
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Profile" component={HomeScreen} />
      {/* Remplace tes autres screens de home ici si tu veux */}
    </HomeStack.Navigator>
  )
}

// **TAB NAVIGATOR**
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        if (route.name === 'Accueil') iconName = 'home';
        else if (route.name === 'Explorer') iconName = 'search';
        else if (route.name === 'Créer') iconName = 'plus';
        else if (route.name === 'Evènements') iconName = 'calendar-o';
        else if (route.name === 'Histoires') iconName = 'book';
        else if (route.name === 'Achats') iconName = 'shopping-basket';
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarActiveTintColor: 'rgba(85, 0, 255, 0.8)',
      tabBarInactiveTintColor: 'rgba(85, 0, 255, 0.3)',
      tabBarStyle: { position: 'absolute' },
      tabBarBackground: () => <View style={styles.container} />,
    })}>
      <Tab.Screen name="Accueil" component={HomeStackNavigator} />
      <Tab.Screen name="Explorer" component={ExploreScreen} />
      <Tab.Screen name="Créer" component={CreateScreen} />
      <Tab.Screen name="Evènements" component={EventScreen} />
      <Tab.Screen name="Histoires" component={LibraryScreen} />
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
          {/* Ecran de login */}
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* Si SignUp n'est pas un écran, on ne l'ajoute pas ici. Gère ça directement dans LoginScreen ou un autre endroit si nécessaire */}
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
});
