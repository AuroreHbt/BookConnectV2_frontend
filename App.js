import React from 'react';

import { StyleSheet, View } from 'react-native';

// Import des Screens pour la nav
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
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
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: { user, story, event },
})

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({

      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Accueil') {
          iconName = 'home';
        } else if (route.name === 'Explorer') {
          iconName = 'search'
        } else if (route.name === 'Créer') {
          iconName = 'plus'
        } else if (route.name === 'Evènements') {
          iconName = 'calendar-o';
        } else if (route.name === 'Histoires') {
          iconName = 'book'
        } else if (route.name === 'Profil') {
          iconName = 'user-circle-o'
        } else if (route.name === 'Achats') {
          iconName = 'shopping-basket'
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },

      headerShown: false,
      tabBarActiveTintColor: 'rgba(85, 0, 255, 0.8)',
      tabBarInactiveTintColor: 'rgba(85, 0, 255, 0.3)',
      tabBarStyle: { position: 'absolute' },

      tabBarBackground: () => (
        <View style={styles.container} />
      ),

    })}

    >
      <Tab.Screen name="Accueil" component={DashboardScreen} />
      <Tab.Screen name="Explorer" component={ExploreScreen} />
      <Tab.Screen name="Créer" component={CreateScreen} />
      <Tab.Screen name="Evènements" component={EventScreen} />
      <Tab.Screen name="Histoires" component={LibraryScreen} />
    </Tab.Navigator>
  );
};


export default function App() {

  // utilisation google fonts
  const [fontsLoaded, error] = useFonts({
    'Pacifico-Regular': require('./assets/fonts/Pacifico-Regular.ttf'), // fontWeight: '400',
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'), // fontWeight: '500',
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'), // fontWeight: '400',
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'), // fontWeight: '300',
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]); // useEffect se lancera à l’initialisation et à chaque changement de l’état fontsLoaded.

  // vérification du chargement de la font
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
};


const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: 'rgba(238, 236, 232, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
