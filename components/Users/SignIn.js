import React, { useState } from "react";
import { signPageStyles } from "../../styles/signPageStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from "react-native";

import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";
import SignUp from "./SignUp";

// import du fond plein gradient
import GradientBackground from "../../styles/gradientBackground";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function LoginScreen() {
  const dispatch = useDispatch();

  // État pour gérer l'affichage de SignIn ou SignUp
  const [currentComponent, setCurrentComponent] = useState("signin");

  // États pour les inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // États pour la validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // État pour afficher ou cacher le mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const validateFields = () => {
    let isValid = true;

    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Veuillez entrer un email valide.");
      isValid = false;
    } else {
      setEmailError("");
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitSignIn = () => {
    // Early return si les champs, email et mot de passes ne sont pas remplies correctement
    if (!validateFields()) {
      console.log("Validation échouée");
      return;
    }
 
    // Fetch de la route post du backend pour la connexion
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Données retournées par le backend:", data);
        console.log('data.result: ', data.result);
 
 
        if (data.result) {
          // Si connexion réussie, redirige vers le dashboard
          dispatch(
            data &&
            login({
              username: data.username,
              email: data.email,
              token: data.token,
              _id: data._id,
            })
          );
          console.log("Connexion réussie");
          setPassword("");
          setUsername("");
          navigation.navigate("TabNavigator", { screen: "HomeScreen" });
        } else {
          console.log("Erreur lors de la connexion:", data.error);
          Alert.alert("Erreur", data.error);
        }
      });
  };

  const renderComponent = () => {
    if (currentComponent === "signup") {
      return <SignUp onGoBack={() => setCurrentComponent("signin")} />;
    }

    return (
      <GradientBackground>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <KeyboardAvoidingView
              style={signPageStyles.container}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Image
                style={signPageStyles.logo}
                source={require("../../assets/LogoBc.png")}
              />
              <Text style={signPageStyles.title}>BookConnect</Text>
              <View style={signPageStyles.separator} />
              <View style={signPageStyles.inputContainer}>
                <TextInput
                  placeholder="E-mail"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  onChangeText={setEmail}
                  value={email}
                  style={signPageStyles.input}
                />
                {emailError ? (
                  <Text style={signPageStyles.errorText}>{emailError}</Text>
                ) : null}

                <View style={signPageStyles.inputPwd}>
                  <TextInput
                    placeholder="Mot de passe"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                    value={password}
                    style={signPageStyles.input}
                  />
                  <TouchableOpacity
                    style={signPageStyles.iconContainer}
                    onPress={toggleShowPassword}
                  >
                    <Icon
                      name={showPassword ? "eye" : "eye-slash"}
                      size={24}
                      color={showPassword ? "rgba(55, 27, 12, 0.8)" : "#D3D3D3"}
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={signPageStyles.errorText}>{passwordError}</Text>
                ) : null}

                <View style={signPageStyles.buttonContainer}>
                  <LinearGradient
                    colors={[
                      "rgba(21, 187, 216, 0.7)",
                      "rgba(85, 0, 255, 0.7)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.7 }}
                    style={signPageStyles.gradientButton}
                    activeOpacity={0.8}
                  >
                    <TouchableOpacity
                      onPress={handleSubmitSignIn}
                      style={signPageStyles.button}
                    >
                      <Text style={signPageStyles.textButton}>
                        Se connecter
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => setCurrentComponent("signup")}
                    activeOpacity={0.8}
                  >
                    <Text style={signPageStyles.textReturn}>
                      Je n'ai pas encore de compte
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </GradientBackground>
    );
  };

  return renderComponent();
}
