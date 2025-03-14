import React, { useState } from "react";

// Import du style global commun avec SignInScreen
import { signPageStyles } from '../../styles/signPageStyles';

// Import de la bibliothèque d'icône FontAwesome via react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome';

import { LinearGradient } from 'expo-linear-gradient';

import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native"; // Import de useNavigation

// Importer les composants pour la connexion
import SignIn from './SignIn';

// Import du fond plein gradient
import GradientBackground from '../../styles/gradientBackground';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const usernameRegex = /^[a-zA-Z0-9]{3,}$/; // Uniquement des caractères alphanumériques et long d'au moins 3 caractères

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Validation du mot de passe avec lettre, chiffre et caractère spécial

// Adresse du backend via la variable d'environnement
const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function SignUp() {
  const navigation = useNavigation(); // Utilisation du hook useNavigation

  const [email, setEmail] = useState(""); // Ajout de l'état pour l'email
  const [username, setUsername] = useState(""); // Ajout de l'état pour le nom d'utilisateur
  const [password, setPassword] = useState(""); // Ajout de l'état pour le mot de passe
  const [showPassword, setShowPassword] = useState(false); // Ajout de l'état pour afficher/masquer le mot de passe

  const [emailError, setEmailError] = useState(""); // Gestion de l'erreur de l'email
  const [usernameError, setUsernameError] = useState(""); // Gestion de l'erreur du nom d'utilisateur
  const [passwordError, setPasswordError] = useState(""); // Gestion de l'erreur du mot de passe

  const [showSignIn, setShowSignIn] = useState(false); // Pour afficher la page de connexion (sign-in)

  const validateFields = () => {
    let isValid = true;

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Veuillez entrer un email valide.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Le nom d'utilisateur doit contenir au moins 3 caractères alphanumériques."
      );
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmitSignUp = () => {
    if (!validateFields()) {
      return;
    }

    // Logic to handle sign up request
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("TabNavigator", { screen: "Accueil" });
        } else {
          console.log("Erreur lors de l'inscription:", data.error);
        }
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Fonction pour afficher/masquer le mot de passe
  };

  const renderComponent = () => {
    if (showSignIn) {
      return <SignIn />;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={signPageStyles.wrapper}>
            <KeyboardAvoidingView style={signPageStyles.container} behavior="padding">
              <Image style={signPageStyles.logo} source={require("../../assets/LogoBc.png")} />
              <Text style={signPageStyles.title}>BookConnect</Text>
              <Text style={signPageStyles.slogan}>Share, discover, write</Text>

              <View style={signPageStyles.inputContainer}>
                <TextInput
                  placeholder="Nom d'utilisateur"
                  onChangeText={setUsername}
                  value={username}
                  style={signPageStyles.input}
                />
                {usernameError ? <Text style={signPageStyles.errorText}>{usernameError}</Text> : null}

                <TextInput
                  placeholder="E-mail"
                  onChangeText={setEmail}
                  value={email}
                  style={signPageStyles.input}
                />
                {emailError ? <Text style={signPageStyles.errorText}>{emailError}</Text> : null}

                <TextInput
                  placeholder="Mot de passe"
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  value={password}
                  style={signPageStyles.input}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={signPageStyles.iconContainer}>
                  <Icon name={showPassword ? "eye" : "eye-slash"} size={24} />
                </TouchableOpacity>
                {passwordError ? <Text style={signPageStyles.errorText}>{passwordError}</Text> : null}

                <View style={signPageStyles.buttonContainer}>
                  <LinearGradient
                    colors={["rgba(21, 187, 216, 0.7)", "rgba(85, 0, 255, 0.7)"]}
                    style={signPageStyles.gradientButton}
                  >
                    <TouchableOpacity onPress={handleSubmitSignUp}>
                      <Text style={signPageStyles.textButton}>S'inscrire</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                <TouchableOpacity onPress={() => setShowSignIn(true)}>
                  <Text style={signPageStyles.textReturn}>J'ai déjà un compte</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
    );
  };

  return renderComponent();
}
