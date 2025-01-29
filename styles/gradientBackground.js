import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { signPageStyles } from '../styles/signPageStyles';

const GradientBackground = ({ children, colors }) => {
  return (
    <LinearGradient
        colors={colors || ['rgba(21, 187, 216, 0.3)', 'rgba(85, 0, 255, 0.3)']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 1 }}
        style={signPageStyles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;