// src/models/Filter.ts

export interface FilterOptions {
  searchText: string;
  effects: string[];
  temperatureMin: number;
  temperatureMax: number;
  favoritesOnly: boolean;
  sortBy: "name" | "temperature" | "relevance";
}

export const createDefaultFilter = (): FilterOptions => ({
  searchText: "",
  effects: [],
  temperatureMin: 70,
  temperatureMax: 200,
  favoritesOnly: false,
  sortBy: "name",
});
