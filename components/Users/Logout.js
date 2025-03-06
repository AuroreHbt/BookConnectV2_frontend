// Logout.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/user'; // Assure-toi que ce chemin est correct
import { useNavigation } from '@react-navigation/native'; // Importation du hook useNavigation

const Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Utilisation du hook useNavigation pour récupérer navigation

  const handleLogout = () => {
    dispatch(logout()); // Déclenche l'action de déconnexion
    navigation.navigate("Login"); // Utilise "Login" si ton écran est nommé "Login" dans Stack.Navigator
  };

  return (
    <View style={styles.container}>
      <Button title="Se déconnecter" onPress={handleLogout} color="#FF6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Logout;
