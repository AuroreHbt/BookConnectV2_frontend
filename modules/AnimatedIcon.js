import React from "react";
import { View } from "react-native";

// bibliotheque d'icones Ionicons
import { Ionicons } from "@expo/vector-icons";

// Applique un masque sur les icones afin de leur appliquer le gradient
import MaskedView from "@react-native-masked-view/masked-view";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AnimatedIcon = ({
  focused,
  iconName,
  ActiveColor,
  inactiveColor,
  size,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(focused ? 1.2 : 1, { duration: 300 }) }],
    };
  });

  return (
    <Animated.View
      style={[
        { alignItems: "center", justifyContent: "center" },
        animatedStyle,
      ]}
    >
      {/* Pour appliquer le LinearGradient uniquement sur la forme des icônes, et non une icone sur un carré de gradient */}
      {/* attention au nom de la props "iconName" qui sera passée dans Appl.js */}

      {focused ? (
        <MaskedView
          maskElement={
            <View style={{ backgroundColor: "transparent" }}>
              <Ionicons name={iconName} size={size} color="black" />
            </View>
          }
        >
          <ActiveColor size={size} />
        </MaskedView>
      ) : (
        <Ionicons name={iconName} size={size} color={inactiveColor} />
      )}
    </Animated.View>
  );
};

export default AnimatedIcon;
