// src/App.tsx

import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useHerbStore } from "@store/herbStore";
import RootNavigator from "@navigation/RootNavigator";
import { Colors } from "@utils/colors";

// Splash Screen aktiv halten bis Daten geladen sind
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const { loadHerbs, isLoading } = useHerbStore();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Kräuter laden
        loadHerbs();

        // Splash Screen ausblenden
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    prepareApp();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.primaryGreen}
      />
      <RootNavigator />
    </View>
  );
};

export default App;
