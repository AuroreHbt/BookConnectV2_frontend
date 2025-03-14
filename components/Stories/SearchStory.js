import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import Header from '../../modules/HeaderStory';

import Icon from 'react-native-vector-icons/FontAwesome';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SearchScreen({ backLibrary, openSummaryPage, openWriterPage }) {
    const navigation = useNavigation();
    const inputRef = useRef(null);
    const [search, setSearch] = useState('');
    const [allStories, setAllStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Récupération des histoires depuis l'API
    const fetchStories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_ADDRESS}/stories/allstories`);
            

            setAllStories(response.data.stories);
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des histoires', error);
            setAllStories([]);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Charge les histoires à l'affichage
    useEffect(() => {
        fetchStories();
    }, []);

    // 🔹 Recharge les histoires quand on revient sur l'écran
    useFocusEffect(
        useCallback(() => {
            fetchStories();
        }, [])
    );

    // 🔹 Filtrer les résultats selon la recherche
    useEffect(() => {
        if (search.length > 0) {
            const lowerSearch = search.toLowerCase();
            
            const authorMap = new Map();
            allStories.forEach((story) => {
                const writerName = story.writer.username;
                if (writerName.toLowerCase().includes(lowerSearch)) {
                    authorMap.set(writerName, {
                        id: `author-${writerName}`,
                        title: writerName,
                        type: 'Auteur',
                    });
                }
            });

            const matchingAuthors = [...authorMap.values()];

            const matchingStories = allStories
                .filter((story) => story.title.toLowerCase().includes(lowerSearch))
                .map((story) => ({
                    id: story._id,
                    title: story.title,
                    type: 'Histoire',
                    writer: story.writer.username,
                    category: story.category,
                    storyFile: story.storyFile,
                    description: story.description
                }));

            setFilteredStories([...matchingAuthors, ...matchingStories]);
        } else {
            setFilteredStories([]);
        }
    }, [search, allStories]);

    // 🔹 Active autoFocus sur l'input
    useFocusEffect(
        useCallback(() => {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timeout);
        }, [])
    );

    // 🔹 Ferme le clavier quand on quitte l'écran
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            Keyboard.dismiss();
        });
        return unsubscribe;
    }, [navigation]);

    // 🔹 Gestion du clic sur un élément

    const handlePressItem = (item) => {
        Keyboard.dismiss();
        setTimeout(() => {
            if (item.type === "Auteur") {
                openWriterPage(item.title);
            } else {
                const fullStory = allStories.find((story) => story._id === item.id) || item;
    
                openSummaryPage({
                    ...fullStory,
                    writer: { username: item.writer}
                }, "search");
            }
        }, 150);
    };


    // 🔹 Fonction pour afficher chaque élément
    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => handlePressItem(item)}>
            <Text style={styles.suggestionText}>{item.title}</Text>
            <Text style={styles.suggestionType}>
                {item.type} {item.type === 'Histoire' ? `- ${item.writer}` : ''}
            </Text>
        </TouchableOpacity>
    ), []);

    // 🔹 Affichage si les histoires sont en train de charger
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Chargement des histoires...</Text>
            </View>
        );
    }

    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.container}>
                  <Header title="Rechercher" onBackPress={backLibrary} />
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={25} color="#000" style={styles.searchIcon} />
                        <TextInput
                            ref={inputRef} // 🔹 Référence pour l’autoFocus
                            style={styles.searchInput}
                            placeholder="Rechercher une histoire"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>

                    <FlatList
                        data={filteredStories}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        initialNumToRender={10}
                        maxToRenderPerBatch={5}
                        windowSize={5}
                        removeClippedSubviews={true}
                        getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
                        keyboardShouldPersistTaps="handled" // ferme le clavier quand on appuie sur un élement de la liste
                        keyboardDismissMode='on-drag' // ferme le clavier quand on fait défiler la liste
                        ListEmptyComponent={
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
        paddingHorizontal: screenWidth * 0.04, // Ajuste le padding horizontal selon la largeur de l’écran (~4%)
        paddingVertical: screenHeight * 0.02, // Ajuste le padding vertical (~2%)
        backgroundColor: "#F8F5F2",
        paddingTop: Platform.OS === "android" 
            ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) 
            : screenHeight * 0.05, // Gère l’espace sous la barre de statut de manière adaptative
    },
    
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        borderRadius: screenWidth * 0.06, // Arrondis adaptatifs (6% de la largeur)
        marginTop: screenHeight * 0.03, // Marge haute proportionnelle (3% de la hauteur)
        borderWidth: 1.5,
        borderColor: "#C0C0C0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: screenHeight * 0.005 }, // Ombre responsive
        shadowOpacity: 0.15,
        shadowRadius: screenHeight * 0.008, // Ajuste la portée de l’ombre
        elevation: 4,
        paddingVertical: screenHeight * 0.002, // Ajuste l’épaisseur du champ
        paddingHorizontal: screenWidth * 0.04, // Ajuste l’espace intérieur
    },    

    searchIcon: {
        marginRight: screenWidth * 0.02, // Ajuste l’espacement dynamique à 2% de la largeur de l’écran
        marginLeft: screenWidth * 0.02,  // Ajuste aussi le décalage à gauche
    },
    
    searchInput: {
        flex: 1,
        fontSize: Math.max(screenWidth * 0.04, 14),
        color: '#000',
    },

    suggestionItem: {
        paddingVertical: screenHeight * 0.015, // Adapte le padding vertical
        paddingHorizontal: screenWidth * 0.04, // Adapte le padding horizontal
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    suggestionText: {
        fontSize: Math.max(screenWidth * 0.04, 14),
        color: '#333',
    },

    suggestionType: {
        fontSize: Math.max(screenWidth * 0.035, 12),
        color: "#666",
        fontStyle: "italic",
    },    

    emptyText: {
        textAlign: "center",
        color: "#aaa",
        fontSize: Math.max(screenWidth * 0.04, 14), // Adapte la taille, min 14px
        marginTop: screenHeight * 0.03, // Adapte la marge haute
    }
    
});
