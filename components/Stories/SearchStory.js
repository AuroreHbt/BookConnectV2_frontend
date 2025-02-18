import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function SearchScreen({ backLibrary, openReadStory, openAuthorPage}) {
    const [search, setSearch] = useState('');
    const [allStories, setAllStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);

    // Fonction pour récupérer les histoires depuis l'API
    const fetchStories = async () => {
        try {
            const response = await axios.get(`${BACKEND_ADDRESS}/stories/allstories`);
            setAllStories(response.data.stories);
        } catch (error) {
            console.error('Erreur lors de la récupération des histoires', error);
            setAllStories([]);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    // useEffect pour filtrer les résultats en fonction de la recherche
    useEffect(() => {
        if (search.length > 0) {
            const lowerSearch = search.toLowerCase();
            
            // Utilisation de Map pour éviter les doublons d’auteurs
            const authorMap = new Map();
            allStories.forEach((story) => {
                const authorName = story.writer.username;
                if (authorName.toLowerCase().includes(lowerSearch)) {
                    authorMap.set(authorName, {
                        id: `author-${authorName}`,
                        title: authorName,
                        type: 'Auteur',
                    });
                }
            });
            const matchingAuthors = [...authorMap.values()];

            // Filtrer les histoires contenant le mot-clé
            const matchingStories = allStories
                .filter((story) => story.title.toLowerCase().includes(lowerSearch))
                .map((story) => ({
                    id: story._id,
                    title: story.title,
                    type: 'Histoire',
                    author: story.writer.username,
                    storyFile: story.storyFile
                }));

            // Concaténer les résultats : auteurs en premier
            setFilteredStories([...matchingAuthors, ...matchingStories]);
        } else {
            setFilteredStories([]);
        }
    }, [search, allStories]);

    // useCallback pour éviter la recréation de renderItem à chaque re-render
    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
                if (item.type === 'Auteur') {
                    openAuthorPage(item.title); // Définit l’auteur sélectionné
                } else {
                    openReadStory(item);
                }
            }}
        >
            <Text style={styles.suggestionText}>{item.title}</Text>
            <Text style={styles.suggestionType}>
                {item.type} {item.type === 'Histoire' ? `- ${item.author}` : ''}
            </Text>
        </TouchableOpacity>
    ), [openReadStory, openAuthorPage ]);

    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} /* Permet que lorsque on clique n importe ou en dehors de la flatlist le clavier disparaisse */ > 
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Icon name="user-circle" size={45} color="#b4b4b4" style={styles.profilIcon} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Rechercher</Text>
                        <Icon name="angle-double-left" size={30} color="black" style={styles.backIcon} onPress={backLibrary} />
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <Icon name="search" size={25} color="#000" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher une histoire..."
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                
                <FlatList
                    data={filteredStories}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    initialNumToRender={10} // Charge 10 éléments au début
                    maxToRenderPerBatch={5} // Charge 5 éléments supplémentaires par lot
                    windowSize={5} // Optimise la mémoire en affichant les 5 éléments les plus proches
                    removeClippedSubviews={true} // Supprime les éléments hors écran pour libérer de la RAM
                    getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })} // Prévient les recalculs inutiles
                    keyboardShouldPersistTaps="always" // Permet qu un élement soit cliquable, sinon cela ferme le clavier et après on peut cliquer (relou)
                    keyboardDismissMode='on-drag' // Ferme le clavier quand on scroll
                    
                    ListEmptyComponent={ // Si recherche = 0 ou aucun résultat affiche le texte
                        search.length > 0 && filteredStories.length === 0 ? (
                            <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
                        ) : null
                    }
                />
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    profilIcon: {
        marginRight: 10,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backIcon: {
        marginRight: 20,
    },
    title: {
        fontSize: 30,
        marginLeft: 20,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 1.5,
        backgroundColor: '#F9F9F9',
        marginBottom: 15,
        marginTop: 30,
    },
    searchIcon: {
        marginRight: 7,
        marginLeft: 8.5,
        marginBottom: 0.5
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    suggestionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    suggestionText: {
        fontSize: 16,
        color: '#333',
    },
    suggestionType: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    emptyText: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 16,
        marginTop: 20,
    },
});
