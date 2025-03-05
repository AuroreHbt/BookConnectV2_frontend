import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import imageTest from "../../assets/jinx.jpg"; // Image de test

import Header from "../../modules/Header";

export default function SummaryStories({ selectedStory = {}, backLibrary,}) {
    console.log("données summary", selectedStory);
    
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.storyHeader}>
                    <Image
                        source={selectedStory?.coverImage ? { uri: selectedStory.coverImage } : imageTest}
                        style={styles.coverImage}
                    />
                    <View style={styles.storyInfo}>
                    <Text style={styles.writer}>{selectedStory.writer.username}</Text>
                        <Text style={styles.category}>{selectedStory.category}</Text>
                        
                        
                        <View style={styles.ratingContainer}>
                            {[...Array(5)].map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={25}
                                    color={index < (selectedStory.rating || 0) ? "#FFD700" : "#CCCCCC"}
                                />
                            ))}
                        </View>
                        <Text style={styles.votes}>{selectedStory.votes ?? 0} votes</Text>
                    </View>
                </View>
                <Text style={styles.title}>{selectedStory.title}</Text>
                <Text style={styles.summary}>{selectedStory.description}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Text style={styles.buttonText}>Lire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.backButton]} onPress={backLibrary}>
                        <Text style={styles.buttonText}>Retour</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F8F5F2",
    },
    storyHeader: {
        flexDirection: "row",
        alignItems: "flex-start", // Alignement en haut
        marginBottom: 20,
        marginTop: 20
    },
    coverImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 }, // Décalage de l'ombre
        shadowOpacity: 0.3, // Opacité de l'ombre
        shadowRadius: 5, // Flou de l'ombre
    
        // 🌟 Ombre pour Android
        elevation: 8, // Plus la valeur est grande, plus l'ombre est marquée
    },
    storyInfo: {
        marginLeft: 15,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start", 
        gap: 10,
        paddingLeft: 10
    },
    
    category: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#333",
        textAlign: "left",
        marginBottom: 5,
     
    },
    writer: {
        fontSize: 30,
        color: "#333",
        marginBottom: 5,
        fontWeight: "bold",
       
    },
    ratingContainer: {
        flexDirection: "row",
        marginBottom: 5,
        gap : 5
    },
    votes: {
        fontSize: 14,
        color: "#666",
        textAlign: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 10,
        
    },
    summary: {
        fontSize: 16,
        color: "#444",
        marginBottom: 20,
        textAlign: "justify",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#4A90E2",
        marginHorizontal: 5,
    },
    backButton: {
        backgroundColor: "#777",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
