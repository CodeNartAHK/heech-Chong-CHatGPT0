// src/components/Header.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  FONT_SIZE_XL,
  FONT_SIZE_LG,
} from "@utils/constants";

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightButton?: {
    icon: string;
    onPress: () => void;
  };
  leftButton?: {
    icon: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightButton,
  leftButton,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={leftButton?.onPress}
          disabled={!leftButton}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{leftButton?.icon || ""}</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <TouchableOpacity
          onPress={rightButton?.onPress}
          disabled={!rightButton}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{rightButton?.icon || ""}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryGreen,
    paddingBottom: SPACING_MD,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING_MD,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: FONT_SIZE_XL,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZE_XL,
    fontWeight: "700",
    color: Colors.white,
  },
  subtitle: {
    fontSize: FONT_SIZE_LG,
    color: Colors.surfaceVariant,
    marginTop: 2,
  },
});

export default Header;
