import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function AddScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{ top: 200 }}
        onPress={() => {
          navigation.navigate("StartScreen");
        }}
      >
        Esto
      </Text>
    </View>
  );
}
