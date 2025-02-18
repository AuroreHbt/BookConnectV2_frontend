import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SearchStory from '../components/Stories/SearchStory'
import ReadStories from '../components/Stories/ReadStories'
import CreateStories from '../components/Stories/CreateStories'
import WriterPage from '../components/Users/WriterPage'

export default function LibraryScreen() {

    const [currentComponent, setCurrentComponent] = useState("library");
    const [selectedStory, setSelectedStory] = useState(null);
    const [selectedWriter, setSelectedWriter] = useState(null)

    if (currentComponent === "search") {
        return (
        <SearchStory backLibrary={() => setCurrentComponent("library")}
        openReadStory={(story) => {
            setSelectedStory(story)
            setCurrentComponent("read")
        }}
        openAuthorPage={(writer) => {
            setSelectedWriter(writer)
            setCurrentComponent("writer")
        }}
        />
    );
}

if (currentComponent === "read") {
    return <ReadStories story={selectedStory} backSearch={() => setCurrentComponent("search")} />;
}

if (currentComponent === "publish") {
    return <CreateStories  backLibrary={() => setCurrentComponent("library")} />;
}

if (currentComponent === "writer") {
    return <WriterPage writer={selectedWriter} backSearch={() => setCurrentComponent("search")} />
}

    return (
         <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Icon name="user-circle" size={45} color="#b4b4b4" style={styles.icon} />
                    <Text style={styles.title}>Histoire</Text>
                </View>
                <TouchableOpacity
                    style={styles.searchContainer}
                    onPress={() => setCurrentComponent("search")}
                >
                    <Icon name="search" size={25} color="#000" style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Rechercher une histoire...</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => setCurrentComponent("publish")}
                >
    <Text style={styles.buttonText}>Publier mon histoire</Text>
</TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Découvrir une histoire</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Parcourir les histoires</Text>

                <View style={styles.storyButtonGrid}>
                    {['Essai', 'Roman', 'Poésie', 'Fantasy', 'Nouvelle', 'Science-fiction', 'Adulte', 'WIP'].map(
                        (name, index) => (
                            <TouchableOpacity key={index} style={styles.storyButton}>
                                <Text style={styles.storyButtonText}>{name}</Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    icon: {
        marginRight: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#F9F9F9',
        marginBottom: 15,
        marginTop: 30
    },
    searchIcon: {
        marginRight: 10,
    },
    searchPlaceholder: {
        fontSize: 16,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 80,
        marginBottom: 80,
    },
    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 25,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 80,
    },
    storyButtonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    storyButton: {
        backgroundColor: '#00C2FF',
        padding: 15,
        borderRadius: 10,
        width: '45%',
        marginBottom: 15,
        alignItems: 'center',
    },
    storyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
