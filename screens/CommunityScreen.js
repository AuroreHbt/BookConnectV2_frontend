import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Écran Communauté</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityScreen;  // Vérifie que c'est bien un export par défaut
