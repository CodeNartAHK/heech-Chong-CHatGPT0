// src/screens/TemperatureGuideScreen.tsx

import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { useHerbStore } from "@store/herbStore";
import { TemperatureSlider, Header, EmptyState } from "@components/index";
import herbService from "@services/herbService";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  SCREEN_PADDING,
  FONT_SIZE_MD,
  FONT_SIZE_LG,
  BORDER_RADIUS_MD,
  TEMPERATURE_MIN,
  TEMPERATURE_MAX,
} from "@utils/constants";
import { formatTemperatureRange, getEffectEmoji } from "@utils/helpers";

interface TemperatureGuideScreenProps {
  navigation: any;
}

const TemperatureGuideScreen: React.FC<TemperatureGuideScreenProps> = ({
  navigation,
}) => {
  const { selectHerb } = useHerbStore();
  const [tempRange, setTempRange] = useState({
    min: TEMPERATURE_MIN,
    max: TEMPERATURE_MAX,
  });

  const filteredHerbs = herbService.getHerbsByTemperatureRange(
    tempRange.min,
    tempRange.max
  );

  const handleHerbPress = (herbId: number) => {
    const herb = filteredHerbs.find((h) => h.id === herbId);
    if (herb) {
      selectHerb(herb);
      navigation.navigate("HerbDetail", { herbId: herb.id });
    }
  };

  const TemperatureBar = ({
    tempMin,
    tempMax,
  }: {
    tempMin: number;
    tempMax: number;
  }) => {
    const screenWidth = Dimensions.get("window").width;
    const barWidth = screenWidth - SCREEN_PADDING * 2 - SPACING_MD * 2;

    const getPercentage = (value: number) => {
      return (
        ((value - TEMPERATURE_MIN) / (TEMPERATURE_MAX - TEMPERATURE_MIN)) * 100
      );
    };

    const leftPercent = getPercentage(tempMin);
    const rightPercent = 100 - getPercentage(tempMax);

    return (
      <View
        style={[
          styles.tempBar,
          {
            marginLeft: `${leftPercent}%`,
            marginRight: `${rightPercent}%`,
            width: `${100 - leftPercent - rightPercent}%`,
          },
        ]}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Temperatur-Guide" subtitle="🌡️ Verdampfungs-Zeiten" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Temperatur-Slider */}
        <TemperatureSlider
          min={tempRange.min}
          max={tempRange.max}
          onChange={(min, max) => setTempRange({ min, max })}
        />

        {/* Info Text */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Kräuter, die bei {tempRange.min}°C - {tempRange.max}°C verdampft werden:
          </Text>
        </View>

        {/* Kräuter nach Temperatur */}
        {filteredHerbs.length > 0 ? (
          <FlatList
            data={filteredHerbs.sort(
              (a, b) => a.vaporizationTempMin - b.vaporizationTempMin
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={styles.herbItem}
                onTouchEnd={() => handleHerbPress(item.id)}
              >
                <View style={styles.herbItemContent}>
                  <View style={styles.herbInfo}>
                    <Text style={styles.herbEmoji}>
                      {getEffectEmoji(item.primaryEffect)}
                    </Text>
                    <View style={styles.herbTextContainer}>
                      <Text style={styles.herbItemName}>{item.name}</Text>
                      <Text style={styles.herbItemEffect}>
                        {item.primaryEffect}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.herbTemp}>
                    <Text style={styles.herbTempText}>
                      {formatTemperatureRange(
                        item.vaporizationTempMin,
                        item.vaporizationTempMax
                      )}
                    </Text>
                  </View>
                </View>

                {/* Temperature Visual */}
                <TemperatureBar
                  tempMin={item.vaporizationTempMin}
                  tempMax={item.vaporizationTempMax}
                />
              </View>
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <EmptyState
            title="Keine Kräuter in diesem Bereich"
            message=" Passe den Temperatur-Bereich an um Kräuter zu sehen."
            icon="🔍"
          />
        )}
      </ScrollView>

      {/* Legende */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Temperatur-Bereiche:</Text>
        <View style={styles.legendItems}>
          <Text style={styles.legendItem}>🔥 70-100°C: Leicht</Text>
          <Text style={styles.legendItem}>🌡️ 130-150°C: Mittel</Text>
          <Text style={styles.legendItem}>⚡ 170-200°C: Intensiv</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    padding: SCREEN_PADDING,
    paddingBottom: 120,
  },
  infoBox: {
    backgroundColor: Colors.surfaceLight,
    padding: SPACING_MD,
    borderRadius: BORDER_RADIUS_MD,
    borderLeftWidth: 4,
    borderLeftColor: Colors.lightGreen,
    marginBottom: SPACING_MD,
  },
  infoText: {
    fontSize: FONT_SIZE_MD,
    color: Colors.textMedium,
    fontWeight: "500",
  },
  herbItem: {
    marginVertical: SPACING_MD,
    overflow: "hidden",
  },
  herbItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING_MD,
    paddingHorizontal: SPACING_MD,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BORDER_RADIUS_MD,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: SPACING_MD / 2,
  },
  herbInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  herbEmoji: {
    fontSize: 24,
    marginRight: SPACING_MD,
  },
  herbTextContainer: {
    flex: 1,
  },
  herbItemName: {
    fontSize: FONT_SIZE_MD,
    fontWeight: "600",
    color: Colors.primaryGreen,
  },
  herbItemEffect: {
    fontSize: FONT_SIZE_MD - 2,
    color: Colors.textGrey,
    marginTop: 2,
  },
  herbTemp: {
    backgroundColor: Colors.warmOrange,
    paddingVertical: SPACING_MD / 2,
    paddingHorizontal: SPACING_SM,
    borderRadius: BORDER_RADIUS_MD,
  },
  herbTempText: {
    color: Colors.white,
    fontSize: FONT_SIZE_MD - 2,
    fontWeight: "600",
  },
  tempBar: {
    height: 6,
    backgroundColor: Colors.lightGreen,
    borderRadius: 3,
  },
  listContent: {
    paddingBottom: SPACING_MD,
  },
  legend: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primaryGreen,
    padding: SPACING_MD,
  },
  legendTitle: {
    color: Colors.white,
    fontWeight: "700",
    marginBottom: SPACING_SM,
  },
  legendItems: {
    gap: SPACING_SM,
  },
  legendItem: {
    color: Colors.white,
    fontSize: FONT_SIZE_MD,
  },
});

export default TemperatureGuideScreen;
