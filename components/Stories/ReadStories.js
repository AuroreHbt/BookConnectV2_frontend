import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";
import { WebView } from "react-native-webview";  // Pour afficher les fichiers PDF en ligne
import { addLike, removeLike } from "../../reducers/story";

export default function ReadStoryScreen({ story, backSearch }) {
    const [isVisible, setIsVisible] = useState(false); // État pour le spoiler des images sensibles
    const likedStories = useSelector((state) => state.story.value);
    const user = useSelector((state) => state.user.value);
    const isLiked = likedStories.some((likedStory) => likedStory._id === story._id); // Vérifie si l'histoire est likée

    const dispatch = useDispatch();

    const handleLike = () => {
        if (!isLiked) {
            dispatch(addLike(story));
        } else {
            dispatch(removeLike(story._id));
        }
    };

    const defaultImage = require('../../assets/image-livre-defaut.jpg');
    const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(story.storyFile)}`;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Bonne lecture {user.username} !</Text>
                <Icon name="angle-double-left" size={30} color="black" style={styles.backIcon} onPress={backSearch} />
                
            </View>

            <View style={styles.storyContainer}>
                <View style={styles.headContent}>
                    <View style={styles.storyTitleContainer}>
                        <Text style={styles.storyTitle}>{story.title}</Text>
                    </View>
                    <View style={styles.likeButton}>
                        <TouchableOpacity onPress={handleLike}>
                            <Icon
                                name={isLiked ? "heart" : "heart-o"}
                                size={28}
                                color={isLiked ? "red" : "rgba(55, 27, 12, 0.3)"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.storyCard}>
                        <Text style={styles.storyPublic}>{story.isAdult ? 'Contenu 18+' : "Tout public"}</Text>
                        <Text style={styles.storyCategory}>{story.category}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={story.coverImage ? { uri: story.coverImage } : defaultImage}
                            style={
                                story.isAdult
                                    ? [styles.coverImageSpoiler, { width: 130, height: 130 }]
                                    : [styles.coverImage, { width: 130, height: 130 }]
                            }
                        />
                        {story.coverImage && story.isAdult && !isVisible && (
                            <Icon
                                name="eye-slash"
                                size={72}
                                style={styles.contentVisible}
                                onPress={() => setIsVisible(true)}
                            />
                        )}
                        {isVisible && (
                            <Image
                                source={{ uri: story.coverImage }}
                                style={[styles.coverImageVisible, { width: 130, height: 130 }]}
                            />
                        )}
                    </View>
                </View>
                <Text style={styles.storyDescription}>{story.description}</Text>
            </View>
            <View style={styles.webViewContainer}>
                <WebView source={{ uri: googleDocsUrl }} />
            </View>
        </View>
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
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    backIcon: {
      
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4A4A4A',

    },
    storyContainer: {
        width: '100%',
        padding: 5,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: "rgba(238, 236, 232, 0.9)",
    },
    headContent: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        width: '100%',
    },
    storyTitleContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(55, 27, 12, 0.5)",
        width: '100%',
    },
    storyTitle: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 18,
        width: '90%',
    },
    likeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 150,
    },
    storyCard: {
        width: '60%',
    },
    storyPublic: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 5,
        marginTop: 10,
        width: '100%',
    },
    storyCategory: {
        fontSize: 18,
        paddingHorizontal: 5,
        marginVertical: 10,
        width: '100%',
        height: 75,
    },
    storyDescription: {
        fontSize: 16,
        paddingHorizontal: 5,
        marginBottom: 15,
        textAlign: 'justify',
        width: '100%',
        flexWrap: 'wrap',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: 135,
        paddingVertical: 2,
        paddingHorizontal: 3,
        marginBottom: 10,
    },
    coverImage: {
        borderRadius: 10,
    },
    coverImageVisible: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 10,
    },
    coverImageSpoiler: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        opacity: 0.3,
    },
    contentVisible: {
        position: 'absolute',
        top: 20,
        right: 20,
        color: 'rgba(253,255,0, 0.8)',
        backgroundColor: 'rgba(255, 123, 0, 0.7)',
        borderRadius: 50,
        padding: 10,
    },
    webViewContainer: {
        flex: 1,
        width: '100%',
    },
});
