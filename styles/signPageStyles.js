import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.8; // Champs plus courts (80% de la largeur de l'écran)

export const signPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F8FB', // Fond clair sans gradient
    },

    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },

    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 36,
        color: '#333', // Couleur sombre pour le texte
        marginBottom: 20,
    },

    inputContainer: {
        width: inputWidth,
        alignItems: 'center',
        paddingTop: 20,
    },

    input: {
        backgroundColor: '#FFFFFF', // Fond clair pour les champs
        paddingVertical: 15,
        borderRadius: 30, // Coins arrondis
        borderWidth: 1,
        borderColor: '#E0E0E0', // Bord doux et subtil
        width: inputWidth,
        paddingHorizontal: 20,
        marginVertical: 12,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    buttonContainer: {
        width: inputWidth,
        alignItems: 'center',
        marginTop: 30,
    },

    gradientButton: {
        paddingVertical: 15,
        width: inputWidth / 1.5,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#6a11cb', // Couleur simple pour le bouton sans gradient
        marginTop: 20,
    },

    textButton: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: 'white',
    },

    textReturn: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '300',
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#5500FF",
        color: "#5500FF",
        marginTop: 20,
    },
});
