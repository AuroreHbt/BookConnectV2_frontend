import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.buttonContainer}>
      <LinearGradient
        colors={['rgba(21, 187, 216, 1)', 'rgba(85, 0, 255, 1)']} // Couleurs du dégradé
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.button}>
          <Text style={styles.textButton}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  gradientBorder: {
    padding: 2, // Épaisseur de la bordure
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#a1d7ea',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

  