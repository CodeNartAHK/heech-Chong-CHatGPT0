// src/utils/colors.ts

export const Colors = {
  // Primärfarben - Natürliche Grüntöne
  primaryGreen: "#2D5016", // Tiefes Waldgrün
  lightGreen: "#4CAF50", // Helleres Natürlich-Grün
  accentGreen: "#7CB342", // Kraut-Grün
  
  // Sekundärfarben - Erde & Wärme
  earthBrown: "#795548", // Erdbraun
  warmOrange: "#F57C00", // Erde-Orange
  
  // Hintergrund
  backgroundLight: "#FAFAF6", // Creme-Weiß
  surfaceLight: "#FFFFFF", // Weiß
  surfaceVariant: "#F5F5F0", // Leicht getönt
  
  // Text & Graustufen
  textDark: "#212121",
  textMedium: "#424242",
  textGrey: "#757575",
  textLight: "#BDBDBD",
  borderLight: "#E0E0E0",
  borderMedium: "#BDBDBD",
  
  // Status & Aktionen
  success: "#66BB6A",
  error: "#EF5350",
  warning: "#FFC107",
  
  // Transparenz-Varianten
  white: "rgba(255, 255, 255, 1)",
  whiteTransparent: "rgba(255, 255, 255, 0.95)",
  
  // Effekt-Kategorien
  effectCategoryColors: {
    beruhigend: "#5E7BA3",
    anregend: "#FFC107",
    entspannend: "#81C784",
    schmerzlindernd: "#FF6B9D",
    verdauungsfördernd: "#FFA726",
    schlaffördernd: "#6C5B7B",
    sedierend: "#78909C",
    antibakteriell: "#66BB6A",
    entzündungshemmend: "#EF5350",
    stimmungsaufhellend: "#FFD54F",
    wärmend: "#FF7043",
    kühlend: "#42A5F5",
    nervenstärkend: "#AB47BC",
    andere: "#9E9E9E",
  },
} as const;

export const useEffectColor = (effectName: string): string => {
  const effectLower = effectName.toLowerCase();
  const colorRecord = Colors.effectCategoryColors as Record<string, string>;
  return colorRecord[effectLower] || Colors.effectCategoryColors.andere;
};
