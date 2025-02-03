import React from 'react';
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
