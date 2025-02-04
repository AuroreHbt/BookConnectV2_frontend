//  import { signPageStyles } from '../styles/signPageStyles';
// SignUpScreen
// SignIn Screen

import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const inputWidth = screenWidth * 0.6; // 80% de la largeur de l'écran

export const signPageStyles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 100, // taille en pixels
        height: 100,
        resizeMode: 'contain', // éviter la déformation
    },

    title: {
        fontFamily: 'Poppins-Medium',
        fontWeight: '600',
        fontSize: 36,
        marginBottom: 5,
        color: '#7325A8',
    },

    slogan: {
        fontFamily: 'Poppins-Medium',
        fontWeight: '400',
        fontSize: 22,
        marginBottom: 5,
        color: '#7325A8',
    },

    inputContainer: {
        width: inputWidth, // largeur fixe pour le container
        alignItems: 'center',
        paddingTop: 50,
        marginBottom: 20,
    },

    inputPwd: {
        flexDirection: 'row',
        alignItems: 'center',
        width: inputWidth,
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#5500FF',
        marginVertical: 10,
      },

    inputPwdText: {
        flex: 1, // Permet au champ texte d'occuper tout l'espace restant
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },

    iconContainer: {
        position: 'absolute',
        right: 15, // Ajustement pour bien aligner l'icône
    },

    input: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#5500FF',
        width: inputWidth,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
      },

    buttonContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: inputWidth,
        alignItems: 'center',
        paddingBottom: 15,
    },

    gradientButton: {
        padding: 12,
        width: inputWidth/1.3,
        alignItems: 'center',
        borderRadius: 15,
    },

    button: {
        padding: 5,
        margin: 10,
    },

    textButton: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },

    textReturn: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '300',
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#5500FF",
        color: "#5500FF",
    },

    errorText: {
        textAlign: 'left',
        fontSize: 14,
        color: 'red',
        width: '100%', // Assurer l'alignement avec les inputs
        paddingLeft: 10, // Ajout d'un padding pour éviter le chevauchement
    },

});
