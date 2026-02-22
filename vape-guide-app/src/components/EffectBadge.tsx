// src/components/EffectBadge.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@utils/colors";
import {
  BORDER_RADIUS_FULL,
  SPACING_SM,
  FONT_SIZE_SM,
} from "@utils/constants";
import { getEffectEmoji } from "@utils/helpers";

interface EffectBadgeProps {
  effect: string;
  weight?: number;
  size?: "small" | "medium" | "large";
}

const EffectBadge: React.FC<EffectBadgeProps> = ({
  effect,
  weight = 0.5,
  size = "medium",
}) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return { padding: 6, fontSize: 11 };
      case "large":
        return { padding: 10, fontSize: 14 };
      default:
        return { padding: 8, fontSize: 12 };
    }
  };

  const sizeStyles = getSize();
  const effectColor =
    Colors.effectCategoryColors[
      effect as keyof typeof Colors.effectCategoryColors
    ] || Colors.effectCategoryColors.andere;

  const opacity = weight ? Math.min(1, 0.4 + weight * 0.6) : 0.7;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: effectColor,
          opacity,
          paddingVertical: sizeStyles.padding,
          paddingHorizontal: sizeStyles.padding * 1.5,
        },
      ]}
    >
      <Text style={[styles.emoji, { fontSize: sizeStyles.fontSize }]}>
        {getEffectEmoji(effect)}
      </Text>
      <Text
        style={[
          styles.text,
          {
            fontSize: sizeStyles.fontSize,
            marginLeft: 4,
          },
        ]}
      >
        {effect}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDER_RADIUS_FULL,
    justifyContent: "center",
  },
  emoji: {
    marginRight: 4,
  },
  text: {
    color: Colors.white,
    fontWeight: "600",
  },
});

export default EffectBadge;
