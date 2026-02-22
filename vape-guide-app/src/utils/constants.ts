// src/utils/constants.ts

export const APP_NAME = "Vape Guide";
export const APP_VERSION = "1.0.0";

export const TEMPERATURE_MIN = 70;
export const TEMPERATURE_MAX = 200;
export const TEMPERATURE_STEP = 5;

export const SCREEN_PADDING = 16;
export const SPACING_XS = 4;
export const SPACING_SM = 8;
export const SPACING_MD = 16;
export const SPACING_LG = 24;
export const SPACING_XL = 32;

export const BORDER_RADIUS_SM = 4;
export const BORDER_RADIUS_MD = 8;
export const BORDER_RADIUS_LG = 16;
export const BORDER_RADIUS_FULL = 9999;

export const FONT_SIZE_XS = 12;
export const FONT_SIZE_SM = 14;
export const FONT_SIZE_MD = 16;
export const FONT_SIZE_LG = 18;
export const FONT_SIZE_XL = 24;
export const FONT_SIZE_XXL = 32;

export const CARD_ELEVATION = 3;

export const HERB_CARD_HEIGHT = 160;
export const HERB_CARD_WIDTH_RATIO = 0.9; // 90% der Screen-Width

export const DEBOUNCE_DELAY = 300;

export const ASYNC_STORAGE_KEYS = {
  FAVORITES: "@vape_guide/favorites",
  SEARCH_HISTORY: "@vape_guide/search_history",
  USER_PREFERENCES: "@vape_guide/preferences",
};

export const EFFECT_CATEGORIES = [
  "beruhigend",
  "anregend",
  "entspannend",
  "schmerzlindernd",
  "verdauungsfördernd",
  "schlaffördernd",
  "sedierend",
  "antibakteriell",
  "entzündungshemmend",
  "stimmungsaufhellend",
  "wärmend",
  "kühlend",
  "nervenstärkend",
] as const;
