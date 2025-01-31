//  import { signPageStyles } from '../styles/signPageStyles';
// SignUpScreen
// SignIn Screen

import { StyleSheet } from 'react-native';


export const signPageStyles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 150, // taille en pixels
        height: 150,
        resizeMode: 'contain', // éviter la déformation
    },

    title: {
        fontFamily: 'Pacifico-Regular',
        fontWeight: '400',
        fontSize: 32,
        marginBottom: 5,
        color: 'rgba(55, 27, 12, 0.9)', // #371B0C
    },

    separator: {
        width: '25%',
        borderColor: 'rgba(55, 27, 12, 0.98)', // #371B0C
        borderTopWidth: 2.5,
        marginBottom: 35,
        marginTop: 10,
    },

    inputContainer: {
        alignItems: 'center',
        width: '80%', // Ajustement à 80%
    },

    inputPwd: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', // Même largeur que les autres inputs
        backgroundColor: '#EEECE8',
        paddingVertical: 15,
        borderRadius: 5,
        borderBottomWidth: 0.7,
        borderBottomColor: 'rgba(55, 27, 12, 0.50)',
        paddingLeft: 15,
        marginVertical: 10,
    },

    iconContainer: {
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        right: 20, // Ajustement pour bien aligner l'icône avec l'input
    },

    input: {
        backgroundColor: '#EEECE8',
        paddingVertical: 15,
        borderRadius: 5,
        borderBottomWidth: 0.7,
        borderBottomColor: 'rgba(55, 27, 12, 0.50)',
        width: '100%',
        paddingLeft: 15,
        marginVertical: 10, // Ajout de marge homogène
    },

    buttonContainer: {
        marginTop: 15,
        marginBottom: 10,
        width: '80%', // Ajustement à 80%
        alignItems: 'center',
    },

    gradientButton: {
        borderRadius: 15,
        marginVertical: 10,
        width: '65%',
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
        color: 'white', // 'rgba(55, 27, 12, 0.8)', // #371B0C
    },

    textReturn: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '300',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(55, 27, 12, 0.80)",
        color: "rgba(55, 27, 12, 0.80)",
    },

    errorText: {
        textAlign: 'left',
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: 'red',
        width: '75%',
    },

});
