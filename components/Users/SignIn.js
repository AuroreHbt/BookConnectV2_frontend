import React, { useState } from "react";
import { signPageStyles } from "../../styles/signPageStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

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
import { useDispatch } from "react-redux";
import { login } from "../../reducers/user";
import { useNavigation } from "@react-navigation/native"; // Import navigation for redirection
import SignUp from "./SignUp";  // Import SignUp component

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS || "http://ton-backend-url"; // Change it to your backend URL

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use navigation to navigate to the home screen
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("signin");  // State to toggle between SignIn and SignUp

  const handleLoginSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      return; // Do nothing if email is invalid
    }
    if (!passwordRegex.test(password)) {
      return; // Do nothing if password is invalid
    }

    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login(data)); // Dispatch login action
          navigation.navigate("TabNavigator", { screen: "Accueil" }); // Navigate to the home screen after successful login
        } else {
          // You can display an error message here if needed
        }
      })
      .catch((error) => {
        console.error("Erreur de connexion :", error);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);  // Toggle password visibility
  };

  // Render SignIn or SignUp component based on currentComponent state
  const renderComponent = () => {
    if (currentComponent === "signup") {
      return <SignUp onGoBack={() => setCurrentComponent("signin")} />;
    }

    return (
      <View style={signPageStyles.container}> {/* Keep the background color of the page simple */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <KeyboardAvoidingView style={signPageStyles.container} behavior="padding">
              <Image style={signPageStyles.logo} source={require("../../assets/LogoBc.png")} />
              <Text style={signPageStyles.title}>BookConnect</Text>
              <View style={signPageStyles.inputContainer}>
                <TextInput
                  placeholder="E-mail"
                  onChangeText={setEmail}
                  value={email}
                  style={signPageStyles.input}
                />
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

                <View style={signPageStyles.buttonContainer}>
                  {/* Applying LinearGradient to the button */}
                  <LinearGradient
                    colors={["rgba(21, 187, 216, 0.7)", "rgba(85, 0, 255, 0.1)"]}
                    style={signPageStyles.gradientButton}
                  >
                    <TouchableOpacity onPress={handleLoginSubmit}>
                      <Text style={signPageStyles.textButton}>Se connecter</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                 <TouchableOpacity onPress={() => setCurrentComponent("signup")}>
                  <Text style={signPageStyles.textReturn}>Je n'ai pas encore de compte</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return renderComponent();  // Render the appropriate component based on currentComponent state
}
