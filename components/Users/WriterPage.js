/* L idée est que la flast list horizontale (les histoires en bas), n affiche que les histoires les mieux notées de l auteur,
par exemple celles notées entre 3.5 et 5.
Le bouton "stories" affiche toutes les histoires */

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import imageTest from "../../assets/jinx.jpg"; // Image de test

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

export default function WriterPage({ writerName, backSearch, openReadStory }) {
    const [stories, setStories] = useState([]);
    const [noStoriesMessage, setNoStoriesMessage] = useState("");
    const [isFollowing, setIsFollowing] = useState(false);

    // Récupération des histoires de l'auteur depuis l'API
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_ADDRESS}/stories/mypublishedstory/${writerName}`
                );

                if (response.data.stories.length === 0) {
                    setNoStoriesMessage("Cet auteur n'a pas encore publié d'histoires.");
                } else {
                    setStories(response.data.stories);
                    setNoStoriesMessage(""); // Réinitialisation du message si l'auteur a des histoires
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des histoires :", error);
                setNoStoriesMessage("Impossible de récupérer les histoires.");
            }
        };

        fetchStories();
    }, [writerName]); // Ne recharge que si `writerName` change

    const handleFollow = () => {
        setIsFollowing((prev) => !prev); // Change entre "Suivre" et "Abonné"
    };

    return (
        <View
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <TouchableOpacity style={styles.backButton} onPress={backSearch}>
                <Icon name="angle-left" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Image source={imageTest} style={styles.headerBackground} />
                <Image source={imageTest} style={styles.avatar} />
            </View>

            <Text style={styles.writerName}>{writerName}</Text>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{stories.length}</Text>
                        <Text style={styles.statLabel}>Histoires</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>42</Text>
                        <Text style={styles.statLabel}>Abonnés</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Note</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.followButton,
                            {
                                backgroundColor: isFollowing ? "#007BFF" : "transparent",
                                borderColor: isFollowing ? "#007BFF" : "#007BFF",
                                borderWidth: 2,
                            },
                        ]}
                        onPress={handleFollow}
                    >
                        <Icon
                            name={isFollowing ? "heart" : "heart-o"}
                            size={18}
                            color={isFollowing ? "white" : "#007BFF"}
                            style={styles.heartIcon}
                        />

                        <Text
                            style={[
                                styles.followButtonText,
                                { color: isFollowing ? "white" : "#007BFF" },
                            ]}
                        >
                            {isFollowing ? "Abonné" : "Suivre"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}>
                        <Text style={styles.buttonText}>Histoires</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}>
                        <Text style={styles.buttonText}>Avis</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.aboutText}>
                    {writerName} est un écrivain passionné par les mondes fantastiques et
                    les récits épiques. Ses œuvres transportent les lecteurs dans des
                    aventures captivantes, mêlant mystère et émotion.
                </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactText}>Envoyer un message</Text>
                </TouchableOpacity>

                <View style={styles.storyHeader}>
                    <Text style={styles.storyTitle}>
                        Meilleures histoires de {writerName}
                    </Text>
                </View>
                {stories.length === 0 ? (
                    <Text style={styles.noStoriesText}>{noStoriesMessage}</Text>
                ) : (
                    <View style={styles.storyContainer}>
                        <FlatList
                            data={stories}
                            keyExtractor={(item) => item._id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.storyList}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.storyCard} onPress={() => openReadStory(item)}>
                                <Image source={imageTest} style={styles.storyImage} />
                            
                                {/* Contenu structuré */}
                                
                                    {/* Titre fixé en hauteur */}
                                    <View style={styles.storyTextContainer}>
                                        <Text style={styles.storyText} numberOfLines={3}  >
                                            {item.title}
                                        </Text>
                                        
                                    </View>
                            
                                    {/* Séparateur */}
                                    <View style={styles.storySeparator} />
                            
                                    {/* Genre & Rating TOUJOURS alignés en bas */}
                                    <View style={styles.storyAuthorRatingContainer}>
                                        <Text style={styles.storyCategory}>{item.category}</Text>
                                        <Text style={styles.storyRating}>3.8 ⭐ {item.rating}</Text>
                                    </View>
                                
                            </TouchableOpacity>
                            
                            )}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: "#F8F5F2",
    },
    contentContainer: {
        alignItems: "center",
        paddingBottom: 30,
    },
    backButton: {
        position: "absolute",
        top: 20,
        right: 20,
        padding: 10,
        zIndex: 10,
    },
    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    headerBackground: {
        width: "100%",
        height: 140,
        borderRadius: 10
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: "black",
        marginTop: -55,
    },
    writerName: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        padding: 20,
    },
    stat: {
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 20,
        width: 90,
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 15,
    },
    followButton: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginHorizontal: 5,
        flex: 1,
    },
    heartIcon: {
        marginRight: 8, 
    },
    followButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    optionButton: {
        backgroundColor: "#696864",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginHorizontal: 5,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    aboutText: {
        fontSize: 15,
        textAlign: "center",
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    contactButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "50%", 
        alignSelf: "center", 
        marginBottom: 20,
        marginTop: 20,
    },
    contactText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    storyHeader: {
        width: "100%",
        paddingLeft: 20,
        marginTop: 20, 
        marginBottom: 5, 
    },
    storyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },
    noStoriesText: {
        fontSize: 16,
        fontStyle: "italic",
        marginTop: 20,
        color: "#777",
        textAlign: "center",
    },
    storyContainer: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: 40,
        alignItems: "center",
    },

    // 🔹 **NOUVEAU DESIGN DES CARTES D'HISTOIRE**
    storyCard: {
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        width: 130,
        height: 200, 
        justifyContent: "space-between",
        margin: 10,
        marginTop: 20,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderWidth: 0.1, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4, 
        
    },
    storyImage: {
        width: "100%",
        height: 90,  // Taille fixe pour éviter les chevauchements
        borderRadius: 10,
    },
    storyTextContainer: {
        flex: 1,
        minHeight: 50,  // **Assure un espace sous l’image**
        justifyContent: "flex-start",  // **Le texte commence toujours en haut**
        alignItems: "center", 
        paddingHorizontal: 5,
        width: "100%", 
        
    },
    storyText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        maxWidth: "100%",
        

    },


    // 🔹 **SÉPARATEUR DE TITRE**
    // storySeparator: {
    //      width: "80%",
    // height: 1,
    // backgroundColor: "#ccc",
    // marginVertical: 5,
    
        
    // },
    // 🔹 **CONTENEUR DE LA CATÉGORIE + NOTE**
    storyAuthorRatingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 30, // Fixer une hauteur pour l'auteur et la note

      },

    storyCategory: {
        fontSize: 12,
        color: "#666",
        fontWeight: 'bold',
        flex: 1,
        paddingLeft: 10,
        textAlign: "left"

    },

    storyRating: {
        fontSize: 12,
        color: "#f5a623",
        fontWeight: "bold",
    },
});

