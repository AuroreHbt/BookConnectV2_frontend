import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShopScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur la page des Achats</Text>
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

export default ShopScreen;
