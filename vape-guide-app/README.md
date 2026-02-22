# 🌿 Vape Guide - React Native App

Vollständige Kräuter-Verwaltungs- und Informations-App für Vaporizer mit React Native, TypeScript und Expo.

## 🎯 Features

✅ **Kräuter-Bibliothek**
- Database mit 48 verschiedenen Kräutern
- Schnelle Suchfunktion
- Filter nach Effekten
- Detailinformationen für jedes Kraut

✅ **Favoriten-System**
- Kräuter mit ⭐ markieren
- Schneller Zugriff auf Lieblings-Kräuter
- Persistente Speicherung

✅ **Temperatur-Guide**
- Interaktive Temperatur-Auswahl (70-200°C)
- Visualisierung der optimalen Verdampfungstemperaturen
- Kräuter-Vorschläge nach Temperaturbereich

✅ **Detailansicht**
- Botanischer Name (Lateinisch)
- Primär- und Sekundär-Effekte mit Gewichtungen
- Dosierungsempfehlungen (kleine/mittlere/große Kammer)
- Warnhinweise und Kombinierbarkeit
- Maximale Tages-Dosis

✅ **Modern UI/UX Design**
- Organisches Natur-Design
- Grüne Farbpalette mit Erd- und Wärmetönen
- Responsive Layout
- Smooth Animations

## 📁 Projektstruktur

```
vape-guide-app/
├── src/
│   ├── App.tsx                      # Main App Entry
│   ├── models/
│   │   ├── Herb.ts                 # Herb Data Model
│   │   ├── Dosage.ts               # Dosage Information
│   │   ├── Effect.ts               # Effect Categories
│   │   └── Filter.ts               # Filter Options
│   ├── store/
│   │   └── herbStore.ts            # Zustand State Management
│   ├── components/
│   │   ├── HerbCard.tsx            # Herb List Item
│   │   ├── EffectBadge.tsx         # Effect Display Badge
│   │   ├── SearchBar.tsx           # Search Input
│   │   ├── FilterChip.tsx          # Filter Button
│   │   ├── TemperatureSlider.tsx   # Temperature Range Selector
│   │   ├── Header.tsx              # Screen Header
│   │   ├── EmptyState.tsx          # Empty State UI
│   │   └── index.ts                # Component Exports
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Herb Library
│   │   ├── HerbDetailScreen.tsx    # Herb Detail View
│   │   ├── FavoritesScreen.tsx     # Favorites List
│   │   ├── TemperatureGuideScreen.tsx  # Temperature Guide
│   │   └── index.ts                # Screen Exports
│   ├── navigation/
│   │   └── RootNavigator.tsx       # React Navigation Setup
│   ├── services/
│   │   └── herbService.ts          # Herb Data Service
│   ├── utils/
│   │   ├── colors.ts               # Color Palette
│   │   ├── constants.ts            # App Constants
│   │   └── helpers.ts              # Utility Functions
│   └── index.tsx                   # Entry Point
├── assets/
│   ├── data/
│   │   └── herbs.json              # Herb Database (48 Herbs)
│   └── images/                     # App Icons & Images
├── app.json                        # Expo Configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript Configuration
├── babel.config.js                 # Babel Configuration
└── README.md                       # This File
```

## 🚀 Installation & Setup

### Voraussetzungen

- **Node.js** ≥ 18.0.0
- **npm** oder **yarn**
- **Expo CLI** (optional): `npm install -g expo-cli`

### Installation

1. **Repository klonen und in Verzeichnis navigieren:**
```bash
cd vape-guide-app
```

2. **Dependencies installieren:**
```bash
npm install
# oder
yarn install
```

3. **App starten:**
```bash
npm start
# oder
expo start
```

4. **Mobile App testen:**

   **iOS:**
   ```bash
   npm run ios
   ```

   **Android:**
   ```bash
   npm run android
   ```

   **Web (Preview):**
   ```bash
   npm run web
   ```

## 📱 App-Screens

### 1. **Home Screen** - Kräuter-Bibliothek
- Übersicht aller 48 Kräuter
- Suchleiste für Kraut-Namen und Effekte
- Effekt-Filter-Buttons
- Favoriten-Stern für schnelles Markieren

### 2. **Herb Detail Screen** - Detailinformationen
- Hero-Sektion mit Kraut-Emoji und Namen
- Verdampfungs-Temperaturbereich
- Primär- und Sekundär-Effekte mit Gewichtungs-Balken
- Ausführliche Beschreibung
- Dosierungsempfehlungen pro Kammer-Größe
- Warnhinweise (besonders hervorgehoben)
- Kombinierbare Kräuter-Hinweise
- Favoriten Toggle

### 3. **Favorites Screen** - Lieblings-Kräuter
- Liste aller favorisierten Kräuter
- Same Card-Layout wie Home Screen
- Empty State bei fehlenden Favoriten
- Schneller Zugriff auf Details

### 4. **Temperature Guide** - Verdampfungs-Übersicht
- Interaktiver Temperatur-Schieber (70-200°C)
- Kräuter gefiltert nach Temperaturbereich
- Visuelle Temperatur-Balken für jedes Kraut
- Legende für Temperatur-Bereiche (Leicht/Mittel/Intensiv)

## 🎨 Design-System

### Farbpalette (Organisch/Natur-Theme)

```
Primär-Grün            #2D5016  (Tiefes Waldgrün)
Licht-Grün             #4CAF50  (Natürlich-Grün)
Akzent-Grün            #7CB342  (Kraut-Grün)
Erd-Braun              #795548  (Erdbraun)
Warm-Orange            #F57C00  (Erde-Orange)

Hintergrund-Hell       #FAFAF6  (Creme-Weiß)
Oberfläche-Hell        #FFFFFF  (Weiß)
```

### Effekt-Farbkodierung

| Effekt | Farbe | Emoji |
|--------|-------|-------|
| Beruhigend | 🔵 #5E7BA3 | 🌸 |
| Anregend | 🟡 #FFC107 | ⚡ |
| Entspannend | 🟢 #81C784 | 🧘 |
| Schmerzlindernd | 🔴 #FF6B9D | 💊 |
| Verdauungsfördernd | 🟠 #FFA726 | 🌾 |
| Schlaffördernd | 🟣 #6C5B7B | 😴 |

## 🔧 Technologie-Stack

### Frontend
- **React Native 0.74** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **Expo 51** - React Native development platform
- **React Navigation 6** - Navigation library

### State Management
- **Zustand** - Lightweight state management

### UI & Styling
- **React Native StyleSheet** - Native styling
- **Responsive Design** - Mobile-first approach

### Data
- **JSON** - Local herb database (48 entries)
- **AsyncStorage** - Persistent favorites storage

## 💾 State Management (Zustand)

Das App-State wird über Zustand mit folgenden Properties verwaltet:

```typescript
interface HerbStore {
  herbs: Herb[];                    // All herbs
  favorites: Herb[];                // Favorite herbs
  filteredHerbs: Herb[];            // Filtered results
  filters: FilterOptions;           // Current filters
  selectedHerb: Herb | null;        // Currently selected herb
  isLoading: boolean;               // Loading state
  
  // Actions
  loadHerbs();                      // Load all herbs
  toggleFavorite(herbId);           // Add/remove favorite
  setFilters(filters);              // Update filters
  clearFilters();                   // Reset all filters
  selectHerb(herb);                 // Select herb for detail view
  applyFilters();                   // Apply current filters
}
```

## 🔍 Suchfunktionalität

Die App unterstützt intelligente Suche nach:
- ✅ Kraut-Namen (Deutsch)
- ✅ Lateinische Namen
- ✅ Effekt-Namen
- ✅ Beschreibungs-Text

## 🏷️ Filter-Optionen

```typescript
interface FilterOptions {
  searchText: string;               // Search text
  effects: string[];                // Selected effects
  temperatureMin: number;           // Min temperature filter
  temperatureMax: number;           // Max temperature filter
  favoritesOnly: boolean;           // Show only favorites
  sortBy: "name" | "temperature" | "relevance";
}
```

## 📦 Dependencies

Key dependencies:

```json
{
  "expo": "~51.0.0",
  "react": "18.3.1",
  "react-native": "0.74.1",
  "@react-navigation/native": "^6.1.14",
  "@react-navigation/bottom-tabs": "^6.5.20",
  "@react-navigation/native-stack": "^6.11.5",
  "zustand": "^4.5.0",
  "@react-native-async-storage/async-storage": "^1.23.1"
}
```

## 🧪 Datenbank: Kräuter

Die `herbs.json` enthält 48 Kräuter mit folgenden Informationen:

```typescript
interface Herb {
  id: number;
  name: string;                     // German name
  nameLatin: string;                // Latin botanical name
  primaryEffect: string;            // Main effect
  primaryEffectWeight: number;      // 0-1 effectiveness
  secondaryEffect: string;          // Secondary effect
  secondaryEffectWeight: number;    // 0-1 effectiveness
  vaporizationTempMin: number;      // Min temperature °C
  vaporizationTempMax: number;      // Max temperature °C
  description: string;              // Full description
  dosage: {
    chamberSmall_mg: number;        // Small chamber dose
    chamberMedium_mg: number;       // Medium chamber dose
    chamberLarge_mg: number;        // Large chamber dose
    maxDailyDose_mg: number;        // Maximum daily dose
    warnings: string;               // Health warnings
    notes: string;                  // Additional notes
  }
}
```

## 💡 Entwickler-Tipps

### Neue Kräuter hinzufügen

1. Edit `assets/data/herbs.json`
2. Füge ein neues Kraut-Object am Ende des `herbs` Array ein
3. App neu starten

### Farben anpassen

Colors sind zentral in `src/utils/colors.ts` definiert:

```typescript
export const Colors = {
  primaryGreen: "#2D5016",
  lightGreen: "#4CAF50",
  // ...
  effectCategoryColors: {
    beruhigend: "#5E7BA3",
    // ...
  }
}
```

### Performance-Optimierungen

- Filter-Logik ist in `herbStore.ts` optimiert
- FlatList Rendering mit `keyExtractor`
- Memo-ized Komponenten empfohlen für große Listen

## 📝 Lizenz

Dieses Projekt ist Open Source. Verwendung für private und kommerzielle Zwecke ist erlaubt.

## 🤝 Beitragen

Contributions sind willkommen! Bitte erstelle einen neuen Branch für deine Features.

## 📧 Support

Für Fragen oder Bugs: GitHub Issues oder Kontakt über CodeNartAHK

---

**Version:** 1.0.0  
**Last Updated:** Februar 2026  
**Built with:** ❤️ und React Native
