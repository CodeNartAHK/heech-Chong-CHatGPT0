// src/components/HerbCard.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Herb } from "@models/Herb";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  SPACING_SM,
  SPACING_XS,
  BORDER_RADIUS_MD,
  CARD_ELEVATION,
  FONT_SIZE_LG,
  FONT_SIZE_SM,
} from "@utils/constants";
import { formatTemperatureRange, getEffectEmoji } from "@utils/helpers";

interface HerbCardProps {
  herb: Herb;
  onPress: (herb: Herb) => void;
  onFavoritePress: (herbId: number) => void;
}

const HerbCard: React.FC<HerbCardProps> = ({
  herb,
  onPress,
  onFavoritePress,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - SPACING_MD * 2;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.85}
      onPress={() => onPress(herb)}
    >
      {/* Header mit Name und Favorit-Button */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{herb.name}</Text>
          <Text style={styles.nameLatin}>{herb.nameLatin}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress(herb.id)}
        >
          <Text style={styles.favoriteIcon}>
            {herb.isFavorite ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body mit Effekten und Temperatur */}
      <View style={styles.body}>
        {/* Effekt-Badges */}
        <View style={styles.effectsRow}>
          <View
            style={[
              styles.effectBadge,
              {
                backgroundColor: Colors.effectCategoryColors[
                  herb.primaryEffect as keyof typeof Colors.effectCategoryColors
                ],
              },
            ]}
          >
            <Text style={styles.effectIcon}>
              {getEffectEmoji(herb.primaryEffect)}
            </Text>
            <Text style={styles.effectText}>{herb.primaryEffect}</Text>
          </View>

          <View style={styles.temperatureBadge}>
            <Text style={styles.temperatureText}>
              {formatTemperatureRange(
                herb.vaporizationTempMin,
                herb.vaporizationTempMax
              )}
            </Text>
          </View>
        </View>

        {/* Dosierungen Preview */}
        <View style={styles.dosageRow}>
          <View style={styles.dosageItem}>
            <Text style={styles.dosageLabel}>S:</Text>
            <Text style={styles.dosageValue}>{herb.dosage.chamberSmall_mg}</Text>
          </View>
          <View style={styles.dosageItem}>
            <Text style={styles.dosageLabel}>M:</Text>
            <Text style={styles.dosageValue}>{herb.dosage.chamberMedium_mg}</Text>
          </View>
          <View style={styles.dosageItem}>
            <Text style={styles.dosageLabel}>L:</Text>
            <Text style={styles.dosageValue}>{herb.dosage.chamberLarge_mg}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: BORDER_RADIUS_MD,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: SPACING_MD,
    marginVertical: SPACING_SM,
    elevation: CARD_ELEVATION,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING_MD,
  },
  name: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "600",
    color: Colors.primaryGreen,
    marginBottom: SPACING_XS,
  },
  nameLatin: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textGrey,
    fontStyle: "italic",
  },
  favoriteButton: {
    padding: SPACING_SM,
  },
  favoriteIcon: {
    fontSize: 24,
    color: Colors.warmOrange,
  },
  body: {
    gap: SPACING_MD,
  },
  effectsRow: {
    flexDirection: "row",
    gap: SPACING_SM,
    alignItems: "center",
  },
  effectBadge: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGreen,
    borderRadius: BORDER_RADIUS_MD,
    paddingVertical: SPACING_SM,
    paddingHorizontal: SPACING_MD,
    alignItems: "center",
    gap: SPACING_XS,
  },
  effectIcon: {
    fontSize: 18,
  },
  effectText: {
    fontSize: FONT_SIZE_SM,
    color: Colors.white,
    fontWeight: "500",
    flex: 1,
  },
  temperatureBadge: {
    backgroundColor: Colors.warmOrange,
    borderRadius: BORDER_RADIUS_MD,
    paddingVertical: SPACING_SM,
    paddingHorizontal: SPACING_MD,
    justifyContent: "center",
  },
  temperatureText: {
    fontSize: FONT_SIZE_SM,
    color: Colors.white,
    fontWeight: "600",
  },
  dosageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: SPACING_SM,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  dosageItem: {
    alignItems: "center",
  },
  dosageLabel: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textGrey,
    fontWeight: "600",
  },
  dosageValue: {
    fontSize: FONT_SIZE_LG,
    color: Colors.primaryGreen,
    fontWeight: "700",
  },
});

export default HerbCard;
