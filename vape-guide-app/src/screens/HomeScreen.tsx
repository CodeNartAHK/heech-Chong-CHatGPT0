// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useHerbStore } from "@store/herbStore";
import {
  HerbCard,
  SearchBar,
  FilterChip,
  Header,
  EmptyState,
} from "@components/index";
import { Herb } from "@models/Herb";
import { Colors } from "@utils/colors";
import {
  SPACING_MD,
  SPACING_SM,
  SCREEN_PADDING,
  EFFECT_CATEGORIES,
} from "@utils/constants";
import { getEffectEmoji } from "@utils/helpers";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    herbs,
    filteredHerbs,
    filters,
    isLoading,
    loadHerbs,
    setFilters,
    toggleFavorite,
    selectHerb,
  } = useHerbStore();

  const [effectsFilter, setEffectsFilter] = useState<string[]>([]);

  useEffect(() => {
    loadHerbs();
  }, []);

  const handleSearch = (text: string) => {
    setFilters({ searchText: text });
  };

  const handleSearchClear = () => {
    setFilters({ searchText: "" });
  };

  const handleEffectToggle = (effect: string) => {
    setEffectsFilter((prev) => {
      const updated = prev.includes(effect)
        ? prev.filter((e) => e !== effect)
        : [...prev, effect];

      setFilters({ effects: updated });
      return updated;
    });
  };

  const handleHerbPress = (herb: Herb) => {
    selectHerb(herb);
    navigation.navigate("HerbDetail", { herbId: herb.id });
  };

  const handleFavoritePress = (herbId: number) => {
    toggleFavorite(herbId);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primaryGreen} />
        <Text style={styles.loadingText}>Kräuter werden geladen...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Vape Guide" subtitle="🌿 Kräuter-Bibliothek" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Suchleiste */}
        <SearchBar
          value={filters.searchText}
          onChangeText={handleSearch}
          onClear={handleSearchClear}
        />

        {/* Effect-Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Effekt-Filter</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {EFFECT_CATEGORIES.map((effect) => (
              <FilterChip
                key={effect}
                label={effect}
                selected={effectsFilter.includes(effect)}
                onPress={() => handleEffectToggle(effect)}
                icon={getEffectEmoji(effect)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Kräuter-Liste */}
        {filteredHerbs.length > 0 ? (
          <FlatList
            data={filteredHerbs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HerbCard
                herb={item}
                onPress={handleHerbPress}
                onFavoritePress={handleFavoritePress}
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <EmptyState
            title="Keine Kräuter gefunden"
            message="Versuche die Filter anzupassen oder einen anderen Suchbegriff einzugeben."
            icon="🔍"
          />
        )}
      </ScrollView>

      {/* Info-Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {filteredHerbs.length} von {herbs.length} Kräutern angezeigt
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 80,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
  },
  loadingText: {
    marginTop: SPACING_MD,
    color: Colors.textGrey,
  },
  filterSection: {
    marginVertical: SPACING_SM,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryGreen,
    marginBottom: SPACING_SM,
  },
  filterScroll: {
    marginHorizontal: -SCREEN_PADDING,
    paddingHorizontal: SCREEN_PADDING,
  },
  listContent: {
    paddingBottom: SPACING_MD,
  },
  footer: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: SPACING_MD,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textGrey,
  },
});

export default HomeScreen;
