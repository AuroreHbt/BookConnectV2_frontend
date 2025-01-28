import React, { useState } from "react";
import { signPageStyles } from '../../styles/signPageStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
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
import { useNavigation } from '@react-navigation/native'; // Hook pour la navigation

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function SignIn() {
  const navigation = useNavigation();  // Utilisation du hook useNavigation
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    if (!validateFields()) {
      console.log("Validation échouée");
      return;
    }

    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Données retournées par le backend:", data);

        if (data.result) {
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
          navigation.navigate("TabNavigator", { screen: "Dashboard" });  // Redirection après connexion réussie
        } else {
          console.log("Erreur lors de la connexion:", data.error);
          Alert.alert("Erreur", data.error);
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <KeyboardAvoidingView
          style={signPageStyles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image style={signPageStyles.logo} source={require("../../assets/LogoBc.png")} />
          <View>
            <Text style={signPageStyles.title}>BookConnect</Text>
          </View>
          <View style={signPageStyles.separator} />
          <View style={signPageStyles.inputContainer}>
            <TextInput
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              onChangeText={(value) => setEmail(value)}
              value={email}
              style={signPageStyles.input}
            />
            {emailError ? <Text style={signPageStyles.errorText}>{emailError}</Text> : null}

            <View style={signPageStyles.inputPwd}>
              <TextInput
                placeholder="Mot de passe"
                secureTextEntry={!showPassword}
                onChangeText={(value) => setPassword(value)}
                value={password}
                style={signPageStyles.input}
              />
              <TouchableOpacity
                style={signPageStyles.iconContainer}
                onPress={toggleShowPassword}
              >
                <Icon
                  name={showPassword ? 'eye' : 'eye-slash'}
                  size={24}
                  color={showPassword ? 'rgba(55, 27, 12, 0.8)' : '#D3D3D3'}
                />
              </TouchableOpacity>
            </View>

            {passwordError ? (
              <Text style={signPageStyles.errorText}>{passwordError}</Text>
            ) : null}

            <View style={signPageStyles.buttonContainer}>
              <LinearGradient
                colors={['rgba(255, 123, 0, 0.9)', 'rgba(216, 72, 21, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.7 }}
                style={signPageStyles.gradientButton}
                activeOpacity={0.8}
              >
                <TouchableOpacity
                  onPress={handleSubmitSignIn}
                  style={signPageStyles.button}
                >
                  <Text style={signPageStyles.textButton}>Se connecter</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")} // Redirection vers la page d'inscription
                activeOpacity={0.8}
              >
                <Text style={signPageStyles.textReturn}>Je n'ai pas encore de compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
