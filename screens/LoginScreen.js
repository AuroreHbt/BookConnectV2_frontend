import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import SignUp from '../components/Users/SignUp';

export default function LoginScreen() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <SignUp />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
