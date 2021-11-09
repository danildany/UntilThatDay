import React from "react";
import { View, Text } from "react-native";

const CountScreeen = ({ route }) => {
  console.log(route);
  console.log(route.params);
  let end = route.params.days.end;
  let start = route.params.days.start;
  let now = new Date().getTime();

  let progreso = Math.round(((now - start) / (end - start)) * 100);
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
      <Text>{route.params.days.title}</Text>
      <Text>{`faltan ${route.params.dias} dias.`}</Text>
      <Text>{`Progreso ${progreso}% `}</Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "blue",
          width: "98%",
          height: 20,
          borderRadius: 50,
          borderWidth: 2,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "red",
            width: `${progreso}%`,
            height: 20,
            borderRadius: 50,
          }}
        ></View>
      </View>
    </View>
  );
};

export default CountScreeen;
