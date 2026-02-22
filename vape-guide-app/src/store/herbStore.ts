// src/store/herbStore.ts

import { create } from "zustand";
import { Herb } from "@models/Herb";
import { FilterOptions, createDefaultFilter } from "@models/Filter";
import herbService from "@services/herbService";
import {
  filterHerbsBySearch,
  filterHerbsByEffect,
  filterHerbsByTemperature,
  sortHerbs,
} from "@utils/helpers";

interface HerbStore {
  // State
  herbs: Herb[];
  favorites: Herb[];
  filteredHerbs: Herb[];
  filters: FilterOptions;
  selectedHerb: Herb | null;
  isLoading: boolean;

  // Actions
  loadHerbs: () => void;
  toggleFavorite: (herbId: number) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  selectHerb: (herb: Herb | null) => void;
  applyFilters: () => void;

  // Getters
  getFavoritesCount: () => number;
  getFilteredCount: () => number;
}

export const useHerbStore = create<HerbStore>((set, get) => ({
  //==========================
  // Initial State
  //==========================
  herbs: [],
  favorites: [],
  filteredHerbs: [],
  filters: createDefaultFilter(),
  selectedHerb: null,
  isLoading: false,

  //==========================
  // Actions
  //==========================
  loadHerbs: () => {
    set({ isLoading: true });
    try {
      const herbs = herbService.getAllHerbs();
      set({
        herbs,
        filteredHerbs: herbs,
        isLoading: false,
      });
    } catch (error) {
      console.error("Fehler beim Laden:", error);
      set({ isLoading: false });
    }
  },

  toggleFavorite: (herbId: number) => {
    const { herbs, favorites } = get();
    const herbIndex = herbs.findIndex((h) => h.id === herbId);

    if (herbIndex >= 0) {
      const updatedHerbs = [...herbs];
      updatedHerbs[herbIndex].isFavorite =
        !updatedHerbs[herbIndex].isFavorite;

      const updatedFavorites = updatedHerbs[herbIndex].isFavorite
        ? [...favorites, updatedHerbs[herbIndex]]
        : favorites.filter((f) => f.id !== herbId);

      set({
        herbs: updatedHerbs,
        favorites: updatedFavorites,
      });

      get().applyFilters();
    }
  },

  setFilters: (newFilters: Partial<FilterOptions>) => {
    const currentFilters = get().filters;
    set({
      filters: {
        ...currentFilters,
        ...newFilters,
      },
    });

    // Neue Filter anwenden
    setTimeout(() => get().applyFilters(), 0);
  },

  clearFilters: () => {
    set({ filters: createDefaultFilter() });
    get().applyFilters();
  },

  selectHerb: (herb: Herb | null) => {
    set({ selectedHerb: herb });
  },

  applyFilters: () => {
    const { herbs, filters } = get();
    let result = [...herbs];

    // Suche
    if (filters.searchText) {
      result = filterHerbsBySearch(result, filters.searchText);
    }

    // Effekte
    if (filters.effects.length > 0) {
      result = filterHerbsByEffect(result, filters.effects);
    }

    // Temperatur
    result = filterHerbsByTemperature(
      result,
      filters.temperatureMin,
      filters.temperatureMax
    );

    // Nur Favoriten
    if (filters.favoritesOnly) {
      result = result.filter((h) => h.isFavorite);
    }

    // Sortierung
    result = sortHerbs(result, filters.sortBy);

    set({ filteredHerbs: result });
  },

  //==========================
  // Getters
  //==========================
  getFavoritesCount: () => {
    return get().favorites.length;
  },

  getFilteredCount: () => {
    return get().filteredHerbs.length;
  },
}));
