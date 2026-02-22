// src/utils/helpers.ts

import { Herb } from "@models/Herb";

export const formatTemperatureRange = (min: number, max: number): string => {
  return min === max ? `${min}°C` : `${min}°C - ${max}°C`;
};

export const calculateAverageTemperature = (
  min: number,
  max: number
): number => {
  return Math.round((min + max) / 2);
};

export const filterHerbsBySearch = (
  herbs: Herb[],
  searchText: string
): Herb[] => {
  if (!searchText.trim()) return herbs;

  const lowercaseSearch = searchText.toLowerCase();

  return herbs.filter(
    (herb) =>
      herb.name.toLowerCase().includes(lowercaseSearch) ||
      herb.nameLatin.toLowerCase().includes(lowercaseSearch) ||
      herb.primaryEffect.toLowerCase().includes(lowercaseSearch) ||
      herb.description.toLowerCase().includes(lowercaseSearch)
  );
};

export const filterHerbsByEffect = (
  herbs: Herb[],
  effects: string[]
): Herb[] => {
  if (!effects || effects.length === 0) return herbs;

  return herbs.filter((herb) =>
    effects.some(
      (effect) =>
        herb.primaryEffect.toLowerCase() === effect.toLowerCase() ||
        herb.secondaryEffect.toLowerCase() === effect.toLowerCase()
    )
  );
};

export const filterHerbsByTemperature = (
  herbs: Herb[],
  minTemp: number,
  maxTemp: number
): Herb[] => {
  return herbs.filter(
    (herb) =>
      herb.vaporizationTempMin >= minTemp &&
      herb.vaporizationTempMax <= maxTemp
  );
};

export const sortHerbs = (
  herbs: Herb[],
  sortBy: "name" | "temperature" | "relevance"
): Herb[] => {
  const sorted = [...herbs];

  switch (sortBy) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "temperature":
      return sorted.sort(
        (a, b) => a.vaporizationTempMin - b.vaporizationTempMin
      );

    case "relevance":
      return sorted.sort((a, b) => b.primaryEffectWeight - a.primaryEffectWeight);

    default:
      return sorted;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const getEffectEmoji = (effectName: string): string => {
  const emojiMap: Record<string, string> = {
    beruhigend: "🌸",
    anregend: "⚡",
    entspannend: "🧘",
    schmerzlindernd: "💊",
    verdauungsfördernd: "🌾",
    schlaffördernd: "😴",
    sedierend: "😌",
    antibakteriell: "🛡️",
    entzündungshemmend: "🔥",
    stimmungsaufhellend: "😊",
    wärmend: "🔥",
    kühlend: "❄️",
    nervenstärkend: "💪",
  };

  return emojiMap[effectName.toLowerCase()] || "🌿";
};

export const makeId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
