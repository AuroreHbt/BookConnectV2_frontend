
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
    ScrollView
} from 'react-native';

import Header from "../../modules/Header";

import Icon from 'react-native-vector-icons/FontAwesome';


const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function ExploreStories({ selectedGenre, backLibrary  }) {
    return (
        <View style={styles.container}>
                        <Header title="Lecture" onBackPress={backLibrary} />
                            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F8F5F2",
    },

    })