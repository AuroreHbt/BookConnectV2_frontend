// attention : avant HomeScreen

// importer les composants pour la connexion
    // component SignUp
    // component SignIn

    
import React from 'react';

import SignIn from '../components/User/SignIn';
import SignUp from '../components/User/SignUp';

import {
    View,
    StyleSheet,
} from 'react-native';


export default function CreateScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <SignUp />
            <SignIn />
        </View>
    );
};


// attention : le StyleSheet doit bien être en dehors de la fonction!
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
