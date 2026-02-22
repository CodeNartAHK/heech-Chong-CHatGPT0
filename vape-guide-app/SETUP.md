// SETUP.md - Vape Guide App Setup Guide

# 🏗️ Vape Guide - Vollständiger Setup Guide

Dieses Dokument beschreibt den kompletten Setup und die Architektur der React Native + TypeScript Vape Guide App.

## 📋 Inhaltsverzeichnis

1. [Installation](#installation)
2. [Projektstruktur](#projektstruktur)
3. [Architektur-Übersicht](#architektur-übersicht)
4. [Entwickler-Workflow](#entwickler-workflow)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Installation

### Schritt 1: Voraussetzungen prüfen

```bash
# Node.js Version checken (min. 18.0.0)
node --version

# npm Version checken (min. 8.0.0)
npm --version
```

### Schritt 2: Repository vorbereiten

```bash
# In das Projektverzeichnis navigieren
cd vape-guide-app

# .gitignore prüfen
cat .gitignore
```

### Schritt 3: Dependencies installieren

```bash
# Mit npm
npm install

# Oder mit yarn
yarn install
```

**Wichtige Packages:**
- `expo` - React Native development framework
- `react-native` - Mobile framework
- `zustand` - State management
- `@react-navigation/*` - Navigation libraries
- TypeScript - Type checking

### Schritt 4: App starten

```bash
# Expo Metro Bundler starten
npm start

# Im Terminal: Optionen anzeigen
# i - iOS Simulator öffnen
# a - Android Emulator öffnen
# w - Web Browser öffnen
# r - App reload
```

---

## 📁 Projektstruktur Erklärung

### Root Level

```
vape-guide-app/
├── src/                     # Main source code
├── assets/                  # Static files & data
├── app.json                # Expo configuration
├── tsconfig.json           # TypeScript settings
├── package.json            # Dependencies
├── babel.config.js         # Babel transpilation
├── README.md               # Main documentation
└── SETUP.md                # This file
```

### `/src` Directory

#### `models/` - Data Structure Definitions

**Herb.ts**
```typescript
// Main herb data structure
interface Herb {
  id: number;
  name: string;              // "Lavender"
  nameLatin: string;         // "Lavandula angustifolia"
  primaryEffect: string;     // "beruhigend"
  primaryEffectWeight: number; // 0.85
  secondaryEffect: string;
  vaporizationTempMin: number; // 125°C
  vaporizationTempMax: number; // 150°C
  description: string;
  dosage: Dosage;
  isFavorite?: boolean;
}
```

**Effect.ts** - Effekt-Kategorien und Styling
**Filter.ts** - Filter-Optionen-Interface
**Dosage.ts** - Dosierungsinformationen

#### `store/` - State Management

**herbStore.ts** (mit Zustand)
```typescript
// Zentrale State für die gesamte App
- herbs[]           // Alle 48 Kräuter
- favorites[]       // Favoriten-Liste
- filteredHerbs[]   // Gefilterte Ergebnisse
- filters: {        // Aktive Filter
    searchText
    effects[]
    temperatureMin/Max
    favoritesOnly
    sortBy
  }
- selectedHerb      // Aktuell angezeigtes Kraut
- isLoading         // Loading-Status

// Actions
- loadHerbs()       // Daten initialisieren
- toggleFavorite()  // Favorit hinzufügen/entfernen
- setFilters()      // Filter aktualisieren
- applyFilters()    // Filter auf Kräuter anwenden
```

#### `services/` - Data Access Layer

**herbService.ts** - Singleton Service
```typescript
// Lädt herbs.json und stellt Zugriff bereit
- getAllHerbs()
- getHerbById(id)
- searchHerbs(query)
- getHerbsByEffect(effect)
- getHerbsByTemperatureRange(min, max)
- getUniquePrimaryEffects()
```

#### `components/` - Reusable UI Components

| Component | Zweck |
|-----------|-------|
| `HerbCard.tsx` | Kraut-Listenitem mit Name, Effekt, Temp, Dosierung |
| `EffectBadge.tsx` | Farbige Badge für Effekt-Anzeige |
| `SearchBar.tsx` | Suchfeld mit Clear-Button |
| `FilterChip.tsx` | Toggle-Button für Filter |
| `TemperatureSlider.tsx` | Temperatur-Bereich-Auswahl |
| `Header.tsx` | Screen Header mit Title und Buttons |
| `EmptyState.tsx` | Placeholder bei leeren Listen |

#### `screens/` - App Screens

| Screen | Funktion |
|--------|----------|
| `HomeScreen.tsx` | Kräuter-Bibliothek mit Search & Filter |
| `HerbDetailScreen.tsx` | Detailansicht eines Krauts |
| `FavoritesScreen.tsx` | Liste der favorisierten Kräuter |
| `TemperatureGuideScreen.tsx` | Temperatur-basierte Navigation |

#### `navigation/` - Navigation Setup

**RootNavigator.tsx**
```
NavigationContainer (React Navigation)
  ├─ Tab Navigator (Bottom Tabs)
  │  ├─ Home Stack
  │  ├─ Favorites Stack
  │  └─ Temperature Stack
```

#### `utils/` - Helper Funktionen & Constants

**colors.ts** - Zentrale Farbpalette
**constants.ts** - App-Konstanten (Spacing, Sizes, etc.)
**helpers.ts** - Utility Functions (Filtering, Sorting, Formatting)

### `/assets` Directory

```
assets/
├── data/
│   └── herbs.json           # 48 Kräuter Database
└── images/                  # App Icons (placeholder)
    ├── icon.png            # App Icon
    ├── splash.png          # Splash Screen
    └── adaptive-icon.png   # Android Adaptive Icon
```

---

## 🏗️ Architektur-Übersicht

### Data Flow

```
herbs.json (Static Data)
    ↓
herbService.ts (Data Loading & Access)
    ↓
herbStore.ts (State Management - Zustand)
    ↓
Screens (React Components)
    ↓
Components (UI Rendering)
    ↓
User Interface
```

### Component Hierarchy

```
App (Entry Point)
├─ RootNavigator
│  ├─ Tab Navigator
│  │  ├─ HomeStack
│  │  │  ├─ HomeScreen
│  │  │  │  └─ HerbCard (FlatList)
│  │  │  │     ├─ EffectBadge
│  │  │  │     └─ FilterChip
│  │  │  │  ├─ SearchBar
│  │  │  │  └─ Header
│  │  │  └─ HerbDetailScreen
│  │  │     ├─ Header
│  │  │     └─ EffectBadge
│  │  ├─ FavoritesStack (ähnliche Struktur)
│  │  └─ TemperatureStack
│  │     ├─ TemperatureGuideScreen
│  │     ├─ TemperatureSlider
│  │     └─ Header
```

### State Management Flow

```
User Action (toggleFavorite, setFilters, etc.)
    ↓
herbStore Action
    ↓
State Update
    ↓
Component Re-render
    ↓
UI Update
```

---

## 👨‍💻 Entwickler-Workflow

### Feature hinzufügen

#### 1. Neues Kraut zur Datenbank hinzufügen

**Datei:** `assets/data/herbs.json`

```json
{
  "id": 49,
  "name": "Mein Kraut",
  "nameLatin": "Genus species",
  "primaryEffect": "beruhigend",
  "primaryEffectWeight": 0.8,
  "secondaryEffect": "entspannend",
  "secondaryEffectWeight": 0.5,
  "vaporizationTempMin": 125,
  "vaporizationTempMax": 150,
  "description": "Beschreibung...",
  "dosage": {
    "chamberSmall_mg": 100,
    "chamberMedium_mg": 300,
    "chamberLarge_mg": 600,
    "maxDailyDose_mg": 1200,
    "warnings": "",
    "notes": ""
  }
}
```

#### 2. Neue Screen hinzufügen

```bash
# 1. Neue Datei erstellen
touch src/screens/MyNewScreen.tsx

# 2. Screen-Template verwenden
# (Siehe HomeScreen.tsx als Beispiel)

# 3. In RootNavigator.tsx hinzufügen
# (Stack.Screen hinzufügen)

# 4. App testen
npm start
```

#### 3. Neue Komponente erstellen

```bash
# 1. Komponente Datei
touch src/components/MyComponent.tsx

# 2. In components/index.ts exportieren
export { default as MyComponent } from "./MyComponent";

# 3. In Screen importieren
import { MyComponent } from "@components/index";
```

#### 4. Store-Action hinzufügen

**Datei:** `src/store/herbStore.ts`

```typescript
// Im create() callback
myNewAction: () => {
  // Neue Action-Logik
  set({ /* state updates */ });
}
```

### Code Style Guidelines

#### TypeScript

```typescript
// Immer Types definieren
const myFunction = (herb: Herb): void => {
  // Implementation
}

// Interfaces für Props
interface MyComponentProps {
  herb: Herb;
  onPress: () => void;
}

// const vs let
const herbsArray = [...]; // Prefer const
let counter = 0;           // Use let if reassignment needed
```

#### Components

```typescript
// Funktionale Components mit TypeScript
const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  return <View>...</View>;
};

export default MyComponent;
```

#### Styling

```typescript
// Verwende StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING_MD,
    backgroundColor: Colors.primaryGreen,
  },
});
```

---

## 📦 Deployment

### iOS Build

```bash
# EAS CLI installieren (optional)
npm install -g eas-cli

# EAS Build starten
eas build --platform ios

# Oder mit Xcode
npm run ios
```

### Android Build

```bash
# EAS Build
eas build --platform android

# Oder mit Android Studio
npm run android
```

### Web Deploy

```bash
# Web Build
npm run web

# Dann auf vercel.com oder netlify.com deployen
```

---

## 🐛 Troubleshooting

### "Module nicht gefunden" Fehler

**Problem:** `Cannot find module '@components/HerbCard'`

**Lösung:**
1. Path Alias in `tsconfig.json` prüfen
2. Import Pfad korrigieren
3. Ggf. App neustarten (`Ctrl+C`, `npm start`)

### "Kräuter laden nicht"

**Problem:** Empty list statt Kräuter

**Lösung:**
1. `assets/data/herbs.json` existiert?
2. JSON Syntax valid? (JSONLint.com testen)
3. herbService.ts lädt korrekt?
4. herbStore.loadHerbs() wird aufgerufen?

### Performance-Probleme

**Problem:** App lädt langsam

**Lösung:**
1. FlatList `renderitem` optimieren
2. Unnötige Re-Renders vermeiden (useMemo, etc.)
3. Große Images compressieren
4. Developer Mode ausschalten für Release

### Types-Fehler

**Problem:** TypeScript Fehler bei Compilation

**Lösung:**
```bash
# TypeScript kompilieren testen
npx tsc --noEmit

# tsconfig.json anpassen
```

---

## 🎓 weitere Ressourcen

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Version:** 1.0.0  
**Last Updated:** Februar 2026
