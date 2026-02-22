// src/components/SearchBar.tsx

import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  SPACING_SM,
  BORDER_RADIUS_FULL,
  FONT_SIZE_MD,
} from "@utils/constants";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Kraut suchen...",
}) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={[styles.container, { width: screenWidth - SPACING_MD * 2 }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textGrey}
        value={value}
        onChangeText={onChangeText}
        selectionColor={Colors.primaryGreen}
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceLight,
    borderRadius: BORDER_RADIUS_FULL,
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    paddingHorizontal: SPACING_MD,
    alignItems: "center",
    height: 48,
    marginVertical: SPACING_MD,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE_MD,
    color: Colors.textDark,
    padding: 0,
  },
  clearButton: {
    padding: SPACING_SM,
    marginLeft: SPACING_SM,
  },
  clearIcon: {
    fontSize: 18,
    color: Colors.textGrey,
    fontWeight: "600",
  },
});

export default SearchBar;
