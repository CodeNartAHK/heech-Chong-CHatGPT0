// src/navigation/RootNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, HerbDetailScreen, FavoritesScreen, TemperatureGuideScreen } from "@screens/index";
import { Colors } from "@utils/colors";
import { FONT_SIZE_SM } from "@utils/constants";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.backgroundLight },
      }}
    >
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen
        name="HerbDetail"
        component={HerbDetailScreen}
        options={{
          cardStyle: { backgroundColor: Colors.white },
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.backgroundLight },
      }}
    >
      <Stack.Screen name="FavoritesList" component={FavoritesScreen} />
      <Stack.Screen
        name="HerbDetailFromFav"
        component={HerbDetailScreen}
        options={{
          cardStyle: { backgroundColor: Colors.white },
        }}
      />
    </Stack.Navigator>
  );
};

const TemperatureStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.backgroundLight },
      }}
    >
      <Stack.Screen name="TempGuide" component={TemperatureGuideScreen} />
      <Stack.Screen
        name="HerbDetailFromTemp"
        component={HerbDetailScreen}
        options={{
          cardStyle: { backgroundColor: Colors.white },
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryGreen,
          tabBarInactiveTintColor: Colors.textGrey,
          tabBarStyle: {
            backgroundColor: Colors.surfaceLight,
            borderTopColor: Colors.borderLight,
            borderTopWidth: 1,
            paddingBottom: 6,
            paddingTop: 6,
            height: 60,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontSize: FONT_SIZE_SM,
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarLabel: ({ focused }) => {
            const labels: Record<string, string> = {
              Home: "🏠 Bibliothek",
              Favorites: "⭐ Favoriten",
              Temperature: "🌡️ Temperatur",
            };
            return labels[route.name] || route.name;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            title: "Bibliothek",
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            title: "Favoriten",
          }}
        />
        <Tab.Screen
          name="Temperature"
          component={TemperatureStack}
          options={{
            title: "Temperatur",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
