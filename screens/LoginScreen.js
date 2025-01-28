// attention : avant HomeScreen

import React, { useState } from 'react';

// importer les composants pour la connexion
import SignIn from '../components/Users/SignIn';
import SignUp from '../components/Users/SignUp';

import {
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen() {

    const [currentComponent, setCurrentComponent] = useState('signup'); // état local currentComponent pour gérer quel composant afficher

    const handleSubmitSignUp = () => {
        console.log('clic signup');
        setCurrentComponent('signup'); // plus de navigation entre screen mais affichage du component avec maj de l'état initial : par défaut = LoginScreen
    };

    const handleSubmitSignIn = () => {
        console.log('clic signin');
        setCurrentComponent('signin');  // plus de navigation entre screen mais affichage du component avec maj de l'état initial : par défaut = LoginScreen
    };

    const renderComponent = () => {
        // fonction qui détermine quel composant afficher en fonction de l'état currentComponent.
        if (currentComponent === 'signup') {
            return <SignUp />;
        } else if (currentComponent === 'signin') {
            return <SignIn />;
        } else {
            return (
                <LinearGradient
                    colors={['rgba(21, 187, 216, 0.3)', 'rgba(85, 0, 255, 0.3)']}
                    start={{ x: 0, y: 0.1 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                >
                    <Image style={styles.logo} source={require('../assets/LogoBc.png')} />
                    <Text style={styles.title}>BookConnect</Text>
                    <Text style={styles.text}>Share, discover, write</Text>

                    <TouchableOpacity
                        onPress={handleSubmitSignIn}
                        activeOpacity={0.8}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSubmitSignUp}
                        activeOpacity={0.8}
                        style={styles.signUpContainer}
                    >
                        <Text style={styles.textSignUp}>S'inscrire</Text>
                    </TouchableOpacity>
                </LinearGradient>
            );
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {renderComponent()}
        </KeyboardAvoidingView>
    );
}


// attention : le StyleSheet doit bien être en dehors de la fonction!
const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
    },

    logo: {
        flex: 0.5,
        width: '60%',
        alignItems: 'center',
        // height: '50%',
    },

    title: {
        fontFamily: 'Pacifico-Regular',
        fontWeight: '400',
        fontSize: 40,
        marginBottom: 15,
        color: 'rgba(85, 0, 255, 0.7)',
    },

    text: {
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 50,
        color: 'rgba(85, 0, 255, 0.7)',
    },

    buttonContainer: {
        marginBottom: 25,
        width: '80%',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(85, 0, 255, 0.8)',
        borderRadius: 50,
    },

    textButton: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },

    signUpContainer: {
        textAlign: 'center',
    },

    textSignUp: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 400,
        fontSize: 18,
        color: 'rgba(85, 0, 255, 0.7)',
    },
});

