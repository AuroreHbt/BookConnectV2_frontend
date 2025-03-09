import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/user'; // Assure-toi que ce chemin est correct
import { useNavigation } from '@react-navigation/native'; // Importation du hook useNavigation

const Logout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Utilisation du hook useNavigation pour récupérer navigation

  // Fonction qui gère la déconnexion automatiquement
  useEffect(() => {
    dispatch(logout()); // Déclenche l'action de déconnexion
    navigation.navigate("Login"); // Redirige vers l'écran de connexion
  }, [dispatch, navigation]); // Le useEffect s'exécute dès que le composant est monté

  return null; // Aucun rendu nécessaire, on fait tout en arrière-plan
};

export default Logout;
