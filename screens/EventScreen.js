import React from 'react';
<<<<<<< HEAD
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import FindEvents from '../components/Events/FindEvents';

export default function EventScreen() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <FindEvents />
        </KeyboardAvoidingView>
    );
}
=======
import { View, Text, StyleSheet } from 'react-native';
>>>>>>> 64f558b4d75c3dec70f98c332273543be66e68a8

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
