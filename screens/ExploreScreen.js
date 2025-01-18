// import des components liés à la recherche
    // parcours events
    // parcours stories

// prévoir les components de résultats
    // FindEvents => map
    // FindStories
    // FindRandomStories
    // LastCreatedStories

// plus tard : parcours shop
    // FindBook
    // FindCollector

import React from 'react';

import ExploreEvents from '../components/Events/ExploreEvents'
import ExploreStories from '../components/Stories/ExploreStories'

import {
    View,
    StyleSheet,
} from 'react-native';


export default function CreateScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <ExploreEvents />
            <ExploreStories />
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
