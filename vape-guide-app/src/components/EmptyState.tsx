// src/components/EmptyState.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@utils/colors";
import {
  SPACING_LG,
  SPACING_MD,
  FONT_SIZE_LG,
  FONT_SIZE_MD,
} from "@utils/constants";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon = "🌿",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING_MD,
  },
  icon: {
    fontSize: 64,
    marginBottom: SPACING_LG,
  },
  title: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.textDark,
    marginBottom: SPACING_MD,
    textAlign: "center",
  },
  message: {
    fontSize: FONT_SIZE_MD,
    color: Colors.textGrey,
    textAlign: "center",
  },
});

export default EmptyState;
