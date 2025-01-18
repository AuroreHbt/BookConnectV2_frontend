// importer les composants pour ajout d'histoire ou d'event
// plus tard : ajout d'un composant pour ajout d'un livre à vendre ?

import React from 'react';

import CreateEvents from '../components/Events/CreateEvents'
import CreateStories from '../components/Stories/CreateStories';

import {
    View,
    StyleSheet,
} from 'react-native';


export default function CreateScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <CreateEvents />
            <CreateStories />
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
