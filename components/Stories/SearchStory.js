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
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function SearchScreen({ backLibrary, openReadStory, openWriterPage }) {
    const navigation = useNavigation(); // 🔹 Pour la navigation
    const inputRef = useRef(null); // 🔹 Référence à l’input pour l’autoFocus
    const [search, setSearch] = useState('');
    const [allStories, setAllStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);

    // 🔹 Récupération des histoires depuis l'API
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

    // 🔹 Filtrer les résultats selon la recherche
    useEffect(() => {
        if (search.length > 0) {
            const lowerSearch = search.toLowerCase();
            
            // 🔹 Éviter les doublons d’auteurs
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

            // 🔹 Filtrer les histoires contenant le mot-clé
            const matchingStories = allStories
                .filter((story) => story.title.toLowerCase().includes(lowerSearch))
                .map((story) => ({
                    id: story._id,
                    title: story.title,
                    type: 'Histoire',
                    writer: story.writer.username,
                    storyFile: story.storyFile
                }));

            // 🔹 Ajouter les auteurs en premier
            setFilteredStories([...matchingAuthors, ...matchingStories]);
        } else {
            setFilteredStories([]);
        }
    }, [search, allStories]);

    // 🔹 Active autoFocus dès que l’écran Search s’affiche
    useFocusEffect(
        useCallback(() => {
            const timeout = setTimeout(() => {
                inputRef.current?.focus(); // 🔹 Met le focus sur l’input
            }, 100); // 🔹 Petit délai pour éviter un bug de navigation

            return () => clearTimeout(timeout);
        }, [])
    );

    // 🔹 Ferme le clavier proprement quand on quitte l’écran Search
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            Keyboard.dismiss();
        });
        return unsubscribe;
    }, [navigation]);

    // 🔹 Gestion du clic sur un élément (ferme le clavier et attend avant de naviguer)
    const handlePressItem = (item) => {
        Keyboard.dismiss();
        setTimeout(() => {
            if (item.type === "Auteur") {
                openWriterPage(item.title);
            } else {
                openReadStory(item, "search");
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Icon name="user-circle" size={45} color="#b4b4b4" style={styles.profilIcon} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Rechercher</Text>
                            <Icon name="angle-left" size={30} color="black" style={styles.backIcon} onPress={backLibrary} />
                        </View>
                    </View>

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
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode='on-drag'
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
        padding: 15,
        backgroundColor: "#F8F5F2",
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    profilIcon: {},
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
        fontSize: 34,
        fontWeight: "bold",
        marginLeft: 30,
        color: '#222'
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        borderRadius: 25,
        marginTop: 30,
        borderWidth: 1.5,
        borderColor: "#C0C0C0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
        padding: 1
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
