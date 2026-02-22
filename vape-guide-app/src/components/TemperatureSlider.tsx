// src/components/TemperatureSlider.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  SPACING_SM,
  BORDER_RADIUS_MD,
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  TEMPERATURE_MIN,
  TEMPERATURE_MAX,
} from "@utils/constants";

interface TemperatureSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const TemperatureSlider: React.FC<TemperatureSliderProps> = ({
  min,
  max,
  onChange,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const sliderWidth = screenWidth - SPACING_MD * 4;

  const getPercentage = (value: number) => {
    return ((value - TEMPERATURE_MIN) / (TEMPERATURE_MAX - TEMPERATURE_MIN)) * 100;
  };

  const getValue = (percentage: number) => {
    return Math.round(
      (percentage / 100) * (TEMPERATURE_MAX - TEMPERATURE_MIN) + TEMPERATURE_MIN
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Temperatur-Bereich</Text>
        <Text style={styles.value}>
          {min}°C - {max}°C
        </Text>
      </View>

      <View style={[styles.sliderWrapper, { width: sliderWidth }]}>
        {/* Hintergrund-Track */}
        <View style={styles.track}>
          <View
            style={[
              styles.activeTrack,
              {
                left: `${getPercentage(min)}%`,
                right: `${100 - getPercentage(max)}%`,
              },
            ]}
          />
        </View>

        {/* Min-Knöpfe für verschiedene Temperaturbereiche */}
        <View style={styles.markersContainer}>
          {[70, 100, 130, 150, 170, 185, 200].map((temp) => (
            <View
              key={temp}
              style={[
                styles.marker,
                {
                  left: `${getPercentage(temp)}%`,
                  backgroundColor:
                    temp >= min && temp <= max
                      ? Colors.lightGreen
                      : Colors.borderLight,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Legende */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: Colors.primaryGreen }]}
          />
          <Text style={styles.legendText}>Min: {min}°C</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: Colors.warmOrange }]}
          />
          <Text style={styles.legendText}>Max: {max}°C</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING_MD,
    paddingVertical: SPACING_MD,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BORDER_RADIUS_MD,
    marginVertical: SPACING_MD,
  },
  header: {
    marginBottom: SPACING_MD,
  },
  title: {
    fontSize: FONT_SIZE_LG,
    fontWeight: "700",
    color: Colors.primaryGreen,
    marginBottom: SPACING_SM,
  },
  value: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textGrey,
  },
  sliderWrapper: {
    height: 60,
    justifyContent: "center",
    marginVertical: SPACING_SM,
  },
  track: {
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
  },
  activeTrack: {
    height: 4,
    backgroundColor: Colors.lightGreen,
    borderRadius: 2,
    position: "absolute",
  },
  markersContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  marker: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    transform: [{ translateX: -4 }],
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: SPACING_MD,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING_SM,
  },
  legendText: {
    fontSize: FONT_SIZE_SM,
    color: Colors.textDark,
    fontWeight: "600",
  },
});

export default TemperatureSlider;
