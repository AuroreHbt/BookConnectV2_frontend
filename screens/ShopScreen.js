import React from 'react';
import { View, Text } from 'react-native';

const ShopScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur la page des Achats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShopScreen;
