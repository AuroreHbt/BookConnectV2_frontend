
import React, { useEffect, useState } from "react";

import {
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Text,
    TextInput,
    View,
    Pressable,
    FlatList,
    Image,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native';

import Header from "../../modules/HeaderStory";

import Icon from 'react-native-vector-icons/FontAwesome';


const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ExploreStories({ writerName, backLibrary  }) {
    return (
        <View style={styles.container}>
                        <Header title="Lecture" onBackPress={backLibrary} />
                            </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
              paddingHorizontal: screenWidth * 0.04, // Ajuste le padding horizontal selon la largeur de l’écran (~4%)
              paddingVertical: screenHeight * 0.02, // Ajuste le padding vertical (~2%)
              backgroundColor: "#F8F5F2",
              paddingTop: Platform.OS === "android" 
                  ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) 
                  : screenHeight * 0.05, // Gère l’espace sous la barre de statut de manière adaptative
    },

    })