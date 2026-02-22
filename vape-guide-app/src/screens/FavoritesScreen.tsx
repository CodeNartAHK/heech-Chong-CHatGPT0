// src/screens/FavoritesScreen.tsx

import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useHerbStore } from "@store/herbStore";
import { HerbCard, Header, EmptyState } from "@components/index";
import { Herb } from "@models/Herb";
import { Colors } from "@utils/colors";
import { SPACING_MD, SCREEN_PADDING } from "@utils/constants";

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { favorites, toggleFavorite, selectHerb, setFilters } = useHerbStore();

  const handleHerbPress = (herb: Herb) => {
    selectHerb(herb);
    navigation.navigate("HerbDetail", { herbId: herb.id });
  };

  const handleFavoritePress = (herbId: number) => {
    toggleFavorite(herbId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favoriten" subtitle="⭐ Deine Lieblings-Kräuter" />

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HerbCard
              herb={item}
              onPress={handleHerbPress}
              onFavoritePress={handleFavoritePress}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            title="Noch keine Favoriten"
            message="Markiere Kräuter mit ★ um sie hier zu speichern."
            icon="⭐"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  listContent: {
    padding: SCREEN_PADDING,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
  },
});

export default FavoritesScreen;
