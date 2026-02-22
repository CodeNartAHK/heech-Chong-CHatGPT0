// src/components/FilterChip.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Colors } from "@utils/colors";
import {
  BORDER_RADIUS_FULL,
  SPACING_SM,
  SPACING_XS,
  FONT_SIZE_SM,
} from "@utils/constants";

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  style?: ViewStyle;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onPress,
  icon,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && styles.chipSelected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text
        style={[
          styles.label,
          selected && styles.labelSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING_XS,
    paddingHorizontal: SPACING_SM,
    borderRadius: BORDER_RADIUS_FULL,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.surfaceLight,
    marginRight: SPACING_SM,
    marginBottom: SPACING_SM,
  },
  chipSelected: {
    backgroundColor: Colors.lightGreen,
    borderColor: Colors.primaryGreen,
  },
  icon: {
    marginRight: SPACING_XS,
    fontSize: 14,
  },
  label: {
    fontSize: FONT_SIZE_SM,
    fontWeight: "600",
    color: Colors.textDark,
  },
  labelSelected: {
    color: Colors.white,
  },
});

export default FilterChip;
