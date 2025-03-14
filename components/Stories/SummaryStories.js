import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar,
    Platform,
    SafeAreaView,
} from "react-native";

import { WebView} from "react-native-webview"

import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../modules/HeaderStory";
import imageTest from "../../assets/jinx.jpg"; // Image de test

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SummaryStories({ selectedStory, backLibrary, }) {
    const [showPdf, setShowPdf] = useState(false);
    const [userRating, setUserRating] = useState(0)

    const pdfUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(selectedStory.storyFile)}&zoom=page-width&scrollMode=vertical&pageMode=thumbs`;


    const injectedJavaScript = `
    document.body.style.backgroundColor = 'white';
    document.documentElement.style.backgroundColor = 'white';
    setTimeout(() => {
        const toolbar = document.getElementById('toolbarContainer'); 
        if (toolbar) toolbar.style.display = 'none;  // 🔹 Affiche la barre d'outils
    }, 500);
`; // Les 4 dernières lignes sont censées faire apparaitre ou disparaitre la barre d outil en fonction de none ou flex mais ca rajoute un margin, va comprendre ce truc de con


    if (showPdf) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
                <WebView 
                    source={{ uri: pdfUrl }} 
                    style={{ flex: 1, marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,  }} 
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={injectedJavaScript}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                />
                <TouchableOpacity style={styles.backArrow} onPress={() => setShowPdf(false)}>
                <Icon name="angle-left" size={30} color="black" />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
const handleStarPress = (index) => {
    setUserRating(index + 1)
}

    return (
        <View style={styles.container}>
            <ScrollView
                        style={styles.scrollContainer}
                        contentContainerStyle={[styles.scrollContent, { flexGrow : 1}]}
                        showsVerticalScrollIndicator={false}
                        >
                <View style={styles.storyHeader}>
                    <Image
                        source={selectedStory.coverImage? { uri: selectedStory.coverImage } : imageTest}
                        style={styles.coverImage}
                    />
                    <View style={styles.storyInfo}>
                        <Text style={styles.category}>{selectedStory.category}</Text>
                        
                        <View style={styles.ratingContainer}>
                            {[...Array(5)].map((_, index) => (
                                <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                                <Icon
                                    key={index}
                                    name="star"
                                    size={25}
                                    color={index < userRating ? "#FFD700" : "#CCCCCC"}
                                />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.votes}>{selectedStory?.votes ?? 0} votes</Text>
                        <TouchableOpacity style={styles.readButton} onPress={() => setShowPdf(true)} >
                            <Text style={styles.buttonText}>Lire</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                <Text style={styles.title}>{selectedStory.title}</Text>
                <Text style={styles.author}>{selectedStory.writer?.username}</Text>
                </View>
                <Text style={styles.summary}>"{selectedStory.description}"</Text>
                <TouchableOpacity 
    style={[styles.button, { marginBottom: screenHeight * 0.05 }]} 
    onPress={backLibrary}
>
                    <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: screenWidth * 0.04, // 4% de la largeur de l’écran
        paddingVertical: screenHeight * 0.02, // 2% de la hauteur de l’écran
        backgroundColor: "#F8F5F2",
        paddingTop: Platform.OS === "android" 
            ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) 
            : screenHeight * 0.05
    },

    storyHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: screenHeight * 0.02,
        minHeight: screenHeight * 0.22,
    },

    coverImage: {
        width: screenWidth * 0.45, // Taille adaptative (~45% de la largeur de l’écran)
        height: screenHeight * 0.3, // Hauteur proportionnelle (~30% de la hauteur de l’écran)
        borderRadius: screenWidth * 0.03, // Arrondi ajusté pour un design plus harmonieux
        shadowColor: "#000",
        shadowOffset: { width: 0, height: screenHeight * 0.005 }, // Ombre responsive
        shadowOpacity: 0.15, // Légèrement plus prononcé pour plus de relief
        shadowRadius: screenHeight * 0.01, // ffet d’ombre plus doux
        elevation: 10, // Améliore l’effet de profondeur sur Android
        resizeMode: "cover", // Assure que l’image remplit bien la zone sans distorsion
    },

    storyInfo: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginLeft:  screenWidth * 0.05,
        gap: screenHeight * 0.033
    },

    category: {
        fontSize: screenWidth * 0.05,
        fontWeight: "bold",
        color: "#333",
        textAlign: "left",
        alignSelf: "flex-start",
    },

    author: {
        fontSize: screenWidth * 0.045,
        alignSelf: "flex-start",
        fontWeight: "bold",
        color: "#444",
    },

    ratingContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
        gap: screenWidth * 0.02
    },

    votes: {
        fontSize: screenWidth * 0.025,
        color: "#666",
        textAlign: "left",
        alignSelf: "flex-start",
    },

    readButton: {
        backgroundColor: "#4A90E2",
        paddingVertical: screenHeight * 0.012,
        paddingHorizontal: screenWidth * 0.08,
        marginTop: screenHeight * 0.04,
        borderRadius: screenWidth * 0.05,
        alignSelf: "center",
        width: screenWidth * 0.35, // 🔹 Largeur responsive
        maxWidth: screenWidth * 0.5,
        minWidth: 140,
        maxWidth: 250, // 🔹 Empêche qu'il soit trop large
        justifyContent: "center", 
        alignItems: "center", 
    },
    
    buttonText: {
        color: "#FFF",
        fontSize: screenWidth * 0.045, // 🔹 Ajuste dynamiquement la taille du texte du bouton
        fontWeight: "bold",
        textAlign: "center",
    },

    title: {
        fontSize: screenWidth * 0.06, // 🔹 Adapte le titre selon la largeur de l’écran
        fontWeight: "bold",
        marginBottom: screenHeight * 0.005
    },

    summary: {
        fontSize: Math.max(screenWidth * 0.04, 14), // Ajuste dynamiquement (min 14px)
        color: "#444",
        marginBottom: screenHeight * 0.025, // Adapte la marge basse selon la hauteur de l’écran
        textAlign: "justify",
        marginTop: screenHeight * 0.016, // adapte la marge haute selon la hauteur de l’écran
        lineHeight: screenHeight * 0.025, // Améliore la lisibilité avec un espacement adapté
    },
    

    button: {
        paddingVertical: screenHeight * 0.012,
        paddingHorizontal: screenWidth * 0.06,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#777",
        width: screenWidth * 0.4,
        maxWidth: screenWidth * 0.5,
        minWidth: 160,
        alignSelf: "center",
        justifyContent: "center"
    },

    backArrow: {
        position: "absolute",
        top: Platform.OS === "ios" ? 50 : 30,  // 🔹 Ajuste selon iOS ou Android
        right: 20,  // 🔹 Place l'icône à droite
        marginTop: 30,
        zIndex: 100,  // 🔹 Toujours au premier plan
        padding: 10,  // 🔹 Meilleur confort de clic
    },
    
});
