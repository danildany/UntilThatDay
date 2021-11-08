import React from "react";
import { View, Text } from "react-native";

const CountScreeen = ({ route }) => {
  console.log(route);
  console.log(route.params);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(2,5,2,0.1)",
        margin: 10,
        height: 500,
        borderRadius: 10,
      }}
    >
      <Text>{`faltan ${route.params.dias} dias.`}</Text>
    </View>
  );
};

export default CountScreeen;
