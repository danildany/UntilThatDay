import React from "react";
import StartScreen from "./screens/StartScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./screens/AddScreen";
import CountScreen from "./screens/CountScreen";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddScreen"
            component={AddScreen}
            options={{
              title: "Agregar",
              headerStyle: {
                backgroundColor: "#1c4f6c",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="CountScreen"
            component={CountScreen}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#1c4f6c",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
