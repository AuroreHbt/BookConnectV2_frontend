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
    StatusBar, 
    Platform,
    Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import imageTest from "../../assets/jinx.jpg"; // Image de test

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function WriterPage({ writerName, backSearch, openSummaryPage }) {
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
             <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
            <TouchableOpacity style={styles.backButton} onPress={backSearch}>
                <Icon name="angle-left" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Image source={imageTest} style={styles.headerBackground} />
                <Image source={imageTest} style={styles.avatar} />
            </View>
           
            <Text style={styles.writerName}>{writerName}</Text>
          
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
                                <TouchableOpacity style={styles.storyCard} onPress={() => openSummaryPage(item)}>
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
        paddingVertical: screenHeight * 0.025,
        backgroundColor: "#F8F5F2",
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) : screenHeight * 0.05
    },
    contentContainer: {
        alignItems: "center",
        paddingBottom: screenHeight * 0.03,
    },

    backButton: {
        position: "absolute",
        top: Platform.OS === "android" 
            ? (StatusBar.currentHeight ? StatusBar.currentHeight + screenHeight * 0.015 : screenHeight * 0.03) 
            : screenHeight * 0.03,  // Ajuste la position en fonction de l'écran et de la barre de statut
        right: screenWidth * 0.05,  // 5% de la largeur de l'écran pour éviter d’être trop collé sur écran large
        padding: screenWidth * 0.02,  // Padding responsive
        top : screenWidth * 0.01,
        right: screenWidth * 0.06,
        zIndex: 10,
    },
    
    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: screenHeight * 0.015, // 1.5% de la hauteur de l’écran pour un meilleur espacement
    },

    headerBackground: {
        width: "100%",
        height: screenHeight * 0.16,  // ~18% de la hauteur de l’écran, adaptable à toutes tailles
        borderTopLeftRadius: screenWidth * 0.03, // Ajuste le rayon des bords selon l'écran
        borderTopRightRadius: screenWidth * 0.03, // Garde des bords arrondis harmonieux
        overflow: "hidden",
    },
    
    avatar: {
        width: screenWidth * 0.25, 
        height: screenWidth * 0.25,
        borderRadius: screenWidth * 0.125,
        borderWidth: 3,
        borderColor: "black",
        marginTop: -55,
    },
    writerName: {
        fontSize: screenWidth * 0.055,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: screenHeight * 0.02,
    },

    statsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        paddingVertical: screenHeight * 0.02, // 2% de la hauteur de l’écran (marge en haut et en bas)
        paddingHorizontal: screenWidth * 0.05, // 5% de la largeur de l’écran (marge sur les côtés)
    },

    stat: {
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: screenHeight * 0.015, // 1.5% de la hauteur de l’écran
        borderRadius: screenWidth * 0.05, // 5% de la largeur de l’écran (proportionné)
        width: screenWidth * 0.22, // 22% de la largeur de l’écran (évite d’être trop grand/petit)
        marginHorizontal: screenWidth * 0.025, // Espacement horizontal responsive
    },
    
statLabel: {
    fontSize: Math.max(screenWidth * 0.025, 12), // Ajuste dynamiquement, minimum 12px
    color: "#777",
    textAlign: "center"
},

statValue: {
    fontSize: Math.max(screenWidth * 0.035, 16), // Ajuste dynamiquement, minimum 16px
    fontWeight: "bold",
    color: "#333",
},

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: screenHeight * 0.02, 
        width: "100%",
        paddingHorizontal: screenWidth * 0.05, 
    },
    
    followButton: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: screenHeight * 0.012, // 1.2% de la hauteur de l’écran
        paddingHorizontal: screenWidth * 0.04, // 4% de la largeur de l’écran
        borderRadius: screenWidth * 0.1, // Rayon de bordure adaptatif (garde une bonne courbure)
        marginHorizontal: screenWidth * 0.02, // Espacement horizontal dynamique
        flex: 1, 
    },

    heartIcon: {
        marginRight: screenWidth * 0.02, 
    },

    followButtonText: {
        fontSize: Math.max(screenWidth * 0.038, 14),
        fontWeight: "bold",
    },

    optionButton: {
        backgroundColor: "#696864",
        paddingVertical: screenHeight * 0.012, // Ajuste automatiquement
        paddingHorizontal: screenWidth * 0.04, // S’adapte mieux
        borderRadius: screenWidth * 0.2, 
        marginHorizontal: screenWidth * 0.02,
        flex: 1,
        alignItems: "center",
    },

    buttonText: {
        fontSize: Math.max(screenWidth * 0.038, 14),
        fontWeight: "bold",
        color: "white",
    },

    aboutText: {
        fontSize: Math.max(screenWidth * 0.038, 13),  // Minimum 13px, sinon 4% de la largeur de l'écran
        textAlign: "center",
        marginHorizontal: screenWidth * 0.05, // Environ 5% de la largeur de l’écran
        marginTop: screenHeight * 0.02, // 1.5% de la hauteur de l’écran
        marginBottom: screenHeight * 0.015, // 1.5% de la hauteur de l’écran
    },
    

    contactButton: {
        backgroundColor: "#007BFF",
        paddingVertical: screenHeight * 0.015, 
        paddingHorizontal: screenWidth * 0.08, 
        borderRadius: 50,
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
        marginTop: screenHeight * 0.02
    },
    
    contactText: {
        color: "#fff",
        fontSize: Math.max(screenWidth * 0.038, 14),
        fontWeight: "bold",
    },

    storyHeader: {
        width: "100%",
        paddingLeft: screenWidth * 0.05,  // S’adapte à la taille de l’écran (~5% de la largeur)
        marginTop: screenHeight * 0.04,  // Ajuste l’espace au-dessus (~2% de la hauteur)
    },
    
    storyTitle: {
        fontSize: Math.max(screenWidth * 0.04, 14),
        fontWeight: "bold",
        textAlign: "left",
    },

    noStoriesText: {
        fontSize: Math.max(screenWidth * 0.04, 14), //  Minimum 14px, sinon 4% de la largeur de l’écran
        fontStyle: "italic",
        marginTop: screenHeight * 0.03, // Environ 3% de la hauteur de l’écran
        color: "#777",
        textAlign: "center",
    },

    storyContainer: {
        width: "100%",
        paddingVertical: screenHeight * 0.02,  // Environ 2% de la hauteur de l'écran
        paddingHorizontal: screenWidth * 0.03,  // Environ 3% de la largeur de l'écran
        paddingBottom: screenHeight * 0.05,  // Environ 5% de la hauteur de l’écran
        alignItems: "center",
    },

    storyCard: {
        padding: screenWidth * 0.015, // Ajustement automatique
        borderRadius: screenWidth * 0.03,
        alignItems: "center",
        width: screenWidth * 0.33, // Augmente légèrement pour éviter un effet trop compact
        height: screenHeight * 0.25, // Ajuste légèrement pour un meilleur ratio hauteur/largeur
        justifyContent: "space-between",
        margin: screenWidth * 0.025,
        backgroundColor: "rgba(255, 255, 255, 0.95)", // Légèrement plus opaque pour une meilleure visibilité
        borderWidth: screenWidth * 0.0015, // Rendre le contour plus fin et responsive
        borderColor: "#DDD", // Légère teinte pour mieux s’intégrer aux designs modernes
        shadowColor: "#000",
        shadowOffset: { width: 0, height: screenHeight * 0.005 }, 
        shadowOpacity: 0.12,
        shadowRadius: screenHeight * 0.01, // Diffusion d’ombre ajustée
        elevation: 4, // Augmente l’élévation pour un meilleur effet de relief sur Android
    },

    storyImage: {
        width: "100%",
        height: screenHeight * 0.12, 
        borderRadius: screenWidth * 0.03,
    },

    storyTextContainer: {
        flex: 1,
        minHeight: Math.max(screenHeight * 0.06, 50),  // Minimum 50px, sinon 6% de la hauteur de l’écran
        justifyContent: "flex-start",  
        alignItems: "center", 
        paddingHorizontal: screenWidth * 0.03,  // Adapté à la largeur de l’écran (~3%)
        width: "100%", 
    },

    storyText: {
        fontSize: Math.max(screenWidth * 0.035, 12),
        fontWeight: "bold",
        textAlign: "center",
        maxWidth: "100%",
        paddingTop: screenHeight * 0.01
    },


    // 🔹 **SÉPARATEUR DE TITRE**
    // storySeparator: {
    //      width: "80%",
    // height: 1,
    // backgroundColor: "#ccc",
    // marginVertical: 5,
    
        
    // },
    storyAuthorRatingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: Math.max(screenHeight * 0.04, 30), // Fixer une hauteur pour l'auteur et la note
        paddingHorizontal: screenWidth * 0.01
    },

    storyCategory: {
        fontSize: Math.max(screenWidth * 0.035, 12),
        color: "#666",
        fontWeight: 'bold',
        flex: 1,
        paddingLeft: 10,
        textAlign: "left"
    },

    storyRating: {
        fontSize: Math.max(screenWidth * 0.035, 12),
        color: "#f5a623",
        fontWeight: "bold",
    },
});

