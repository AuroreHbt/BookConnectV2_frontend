import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function SearchScreen({ backLibrary, openReadStory }) { // la fonction backLibrary est passée en prop depuis LibraryScreen


    const [search, setSearch] = useState('');     
    const [allStories, setAllStories] = useState([]);  
    const [filteredStories, setFilteredStories] = useState([]);  // état contenant les histoires en fonction de la recherche 

    
    const fetchStories = async () => {
        try {
            const response = await axios.get(`${BACKEND_ADDRESS}/stories/allstories`);
            setAllStories(response.data.stories);  // stocke les histoires recuperées depuis l api dans l état allStories
        } catch (error) {
            console.error('Erreur lors de la récupération des histoires ', error);
            setAllStories([]);
        }
    };

    
    useEffect(() => { // recupere les histoires au chargement du composant
        fetchStories();
    }, []);

    
    useEffect(() => {
        if (search.length > 0) {
            const filtered = allStories.filter((story) => {
                // recherche par titre ou auteur
                const titleSearch = story.title.toLowerCase().includes(search.toLowerCase()); // transforme titre en minuscule ainsi que le texte de recherche pour effectuer une recherche insensible à la casse
                const authorSearch = story.writer.username.toLowerCase().includes(search.toLowerCase()); // idem mais pour l auteur
                return titleSearch || authorSearch;  
            })
            setFilteredStories(filtered); // stocke les histoires correspondant à la recherche par titre ou auteur
        } else {
            setFilteredStories([]);  // vide les suggestions si la recherche est vide
        }
    }, [search, allStories]); // tableau de dépendance qui déclenche le useEffect si le champ serach est modifié ou si la liste des histoires/auteurs est modifiée (ajout ou suppression d histoire par ex.)



    return (
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
                    keyExtractor={(item) => item._id} 
                    renderItem={({ item }) => (
                            <TouchableOpacity
                            style={styles.suggestionItem}
                                onPress={() => openReadStory(item)}>
                                <Text style={styles.suggestionText}>
                                {`${item.title} - ${item.writer.username}`}
                                </Text>
                            </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        search.length > 0 && filteredStories.length === 0 ? (
                            <Text style={styles.emptyText}>Aucun résultat trouvé</Text>
                        ) : null // si aucune des deux conditions n est remplie, le texte ne s affiche pas
                    }
                />
            </View>
        </KeyboardAvoidingView>
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
    emptyText: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 16,
        marginTop: 20,
    },
});
