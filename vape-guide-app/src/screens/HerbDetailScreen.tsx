// src/screens/HerbDetailScreen.tsx

import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useHerbStore } from "@store/herbStore";
import { EffectBadge, Header } from "@components/index";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  SPACING_SM,
  SPACING_LG,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  FONT_SIZE_XXL,
  BORDER_RADIUS_MD,
} from "@utils/constants";
import { formatTemperatureRange, getEffectEmoji } from "@utils/helpers";

interface HerbDetailScreenProps {
  navigation: any;
  route: any;
}

const HerbDetailScreen: React.FC<HerbDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { herbId } = route.params;
  const { herbs, toggleFavorite, selectedHerb } = useHerbStore();

  const herb = 
    selectedHerb || herbs.find((h) => h.id === herbId);

  if (!herb) {
    return (
      <View style={styles.container}>
        <Header title="Kraut nicht gefunden" />
        <Text style={styles.errorText}>
          Das angeforderte Kraut konnte nicht geladen werden.
        </Text>
      </View>
    );
  }

  const handleFavorite = () => {
    toggleFavorite(herb.id);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={herb.name}
        leftButton={{ icon: "←", onPress: handleGoBack }}
        rightButton={{ icon: herb.isFavorite ? "★" : "☆", onPress: handleFavorite }}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Sektion */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{getEffectEmoji(herb.primaryEffect)}</Text>
          <View style={styles.heroContent}>
            <Text style={styles.herbName}>{herb.name}</Text>
            <Text style={styles.herbLatin}>{herb.nameLatin}</Text>
          </View>
        </View>

        {/* Temperatur-Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌡️ Verdampfungs-Temperatur</Text>
          <View style={styles.temperatureBox}>
            <Text style={styles.temperatureValue}>
              {formatTemperatureRange(
                herb.vaporizationTempMin,
                herb.vaporizationTempMax
              )}
            </Text>
            <Text style={styles.temperatureLabel}>optimal</Text>
          </View>
        </View>

        {/* Effekte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Effekte</Text>
          <View style={styles.effectsContainer}>
            <View style={styles.effectItem}>
              <Text style={styles.effectLabel}>Primär-Effekt:</Text>
              <EffectBadge
                effect={herb.primaryEffect}
                weight={herb.primaryEffectWeight}
                size="large"
              />
              <View style={styles.weightBar}>
                <View
                  style={[
                    styles.weightFill,
                    {
                      width: `${herb.primaryEffectWeight * 100}%`,
                      backgroundColor: Colors.lightGreen,
                    },
                  ]}
                />
              </View>
              <Text style={styles.weightPercent}>
                {Math.round(herb.primaryEffectWeight * 100)}%
              </Text>
            </View>

            <View style={styles.effectItem}>
              <Text style={styles.effectLabel}>Sekundär-Effekt:</Text>
              <EffectBadge
                effect={herb.secondaryEffect}
                weight={herb.secondaryEffectWeight}
                size="large"
              />
              <View style={styles.weightBar}>
                <View
                  style={[
                    styles.weightFill,
                    {
                      width: `${herb.secondaryEffectWeight * 100}%`,
                      backgroundColor: Colors.accentGreen,
                    },
                  ]}
                />
              </View>
              <Text style={styles.weightPercent}>
                {Math.round(herb.secondaryEffectWeight * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Beschreibung */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Beschreibung</Text>
          <Text style={styles.description}>{herb.description}</Text>
        </View>

        {/* Dosierung */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚖️ Dosierung</Text>
          <View style={styles.dosageGrid}>
            <View style={styles.dosageCard}>
              <Text style={styles.dosageCardLabel}>Kleine Kammer</Text>
              <Text style={styles.dosageCardValue}>
                {herb.dosage.chamberSmall_mg}
              </Text>
              <Text style={styles.dosageCardUnit}>mg</Text>
            </View>
            <View style={styles.dosageCard}>
              <Text style={styles.dosageCardLabel}>Mittlere Kammer</Text>
              <Text style={styles.dosageCardValue}>
                {herb.dosage.chamberMedium_mg}
              </Text>
              <Text style={styles.dosageCardUnit}>mg</Text>
            </View>
            <View style={styles.dosageCard}>
              <Text style={styles.dosageCardLabel}>Große Kammer</Text>
              <Text style={styles.dosageCardValue}>
                {herb.dosage.chamberLarge_mg}
              </Text>
              <Text style={styles.dosageCardUnit}>mg</Text>
            </View>
          </View>
          <View style={styles.maxDoseBox}>
            <Text style={styles.maxDoseLabel}>Maximale Tages-Dosis:</Text>
            <Text style={styles.maxDoseValue}>
              {herb.dosage.maxDailyDose_mg} mg
            </Text>
          </View>
        </View>

        {/* Warnhinweise */}
        {herb.dosage.warnings && (
          <View style={styles.section}>
            <View style={[styles.warningBox]}>
              <Text style={styles.warningTitle}>⚠️ Warnhinweise</Text>
              <Text style={styles.warningText}>{herb.dosage.warnings}</Text>
            </View>
          </View>
        )}

        {/* Hinweise */}
        {herb.dosage.notes && (
          <View style={styles.section}>
            <View style={styles.notesBox}>
              <Text style={styles.notesTitle}>💡 Hinweise</Text>
              <Text style={styles.notesText}>{herb.dosage.notes}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    padding: SPACING_MD,
    paddingBottom: 40,
  },
  hero: {
    alignItems: "center",
    marginBottom: SPACING_LG,
    paddingVertical: SPACING_LG,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BORDER_RADIUS_MD,
    borderWidth: 2,
    borderColor: Colors.lightGreen,
  },
  heroEmoji: {
    fontSize: FONT_SIZE_XXL,
    marginBottom: SPACING_SM,
  },
  heroContent: {
    alignItems: "center",
  },
  herbName: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.primaryGreen,
  },
  herbLatin: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textGrey,
    fontStyle: "italic",
    marginTop: SPACING_SM,
  },
  section: {
    marginBottom: SPACING_LG,
  },
  sectionTitle: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.primaryGreen,
    marginBottom: SPACING_MD,
  },
  temperatureBox: {
    backgroundColor: Colors.warmOrange,
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
    alignItems: "center",
  },
  temperatureValue: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.white,
  },
  temperatureLabel: {
    fontSize: FONT_SIZE_SM,
    color: Colors.white,
    marginTop: SPACING_SM,
  },
  effectsContainer: {
    gap: SPACING_MD,
  },
  effectItem: {
    backgroundColor: Colors.surfaceLight,
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
    borderLeftWidth: 4,
    borderLeftColor: Colors.lightGreen,
  },
  effectLabel: {
    fontSize: FONT_SIZE_SM,
    fontWeight: "600",
    color: Colors.textGrey,
    marginBottom: SPACING_SM,
  },
  weightBar: {
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    marginVertical: SPACING_SM,
    overflow: "hidden",
  },
  weightFill: {
    height: "100%",
    borderRadius: 3,
  },
  weightPercent: {
    fontSize: FONT_SIZE_SM,
    fontWeight: "500",
    color: Colors.textDark,
    textAlign: "right",
  },
  description: {
    fontSize: FONT_SIZE_MD,
    color: Colors.textMedium,
    lineHeight: 22,
  },
  dosageGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING_SM,
    marginBottom: SPACING_MD,
  },
  dosageCard: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  dosageCardLabel: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textGrey,
    textAlign: "center",
    marginBottom: SPACING_SM,
  },
  dosageCardValue: {
    fontSize: FONT_SIZE_XL,
    fontWeight: "700",
    color: Colors.primaryGreen,
  },
  dosageCardUnit: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textGrey,
    marginTop: SPACING_XS,
  },
  maxDoseBox: {
    backgroundColor: Colors.lightGreen,
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
    alignItems: "center",
  },
  maxDoseLabel: {
    fontSize: FONT_SIZE_SM,
    color: Colors.white,
  },
  maxDoseValue: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.white,
    marginTop: SPACING_SM,
  },
  warningBox: {
    backgroundColor: "#FFF3E0",
    borderLeftWidth: 4,
    borderLeftColor: "#FF6F00",
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
  },
  warningTitle: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: "#FF6F00",
    marginBottom: SPACING_SM,
  },
  warningText: {
    fontSize: FONT_SIZE_MD,
    color: "#E65100",
    lineHeight: 20,
  },
  notesBox: {
    backgroundColor: "#E8F5E9",
    borderLeftWidth: 4,
    borderLeftColor: Colors.lightGreen,
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
  },
  notesTitle: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.primaryGreen,
    marginBottom: SPACING_SM,
  },
  notesText: {
    fontSize: FONT_SIZE_MD,
    color: Colors.textMedium,
    lineHeight: 20,
  },
  errorText: {
    fontSize: FONT_SIZE_MD,
    color: Colors.textGrey,
    textAlign: "center",
    marginTop: SPACING_LG,
  },
});

export default HerbDetailScreen;
