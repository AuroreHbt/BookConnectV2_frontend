import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

const ConditionalSpoilerImage = ({ source, isAdult, blurRadius = 10 }) => {
    const [showImage, setShowImage] = useState(!isAdult);

    const toggleImage = () => {
        setShowImage(!showImage);
    };

    return (
        <View style={styles.container}>
            <Image
                source={source}
                style={styles.image}
                blurRadius={showImage ? 0 : blurRadius}
            />
            {isAdult && (
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={toggleImage}
                >
                    <Text style={styles.overlayText}>
                        {showImage ? 'Masquer le contenu' : 'Afficher le contenu pour adultes'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ConditionalSpoilerImage;
