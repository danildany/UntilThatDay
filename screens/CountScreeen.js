import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { getData, storeData } from "../data/dataManager";

const CountScreeen = ({ route }) => {
  let end = route.params.days.end;
  let start = route.params.days.start;
  let now = new Date().getTime();
  let progreso = Math.round(((now - start) / (end - start)) * 100);
  const navigation = useNavigation();

  const borrarInfo = async () => {
    let data = await getData();
    for (let i = 0; i < data.length; i++) {
      let infoData = JSON.parse(data[i]);
      if (infoData.id == route.params.days.id) {
        data.splice(i, 1);
      }
    }
    storeData(data);
    navigation.navigate("StartScreen");
  };
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
          width: "95%",
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
          }}
        ></View>
      </View>
      <View style={{ position: "absolute", bottom: 20, width: "95%" }}>
        <Button color="red" title="Borrar" onPress={borrarInfo} />
      </View>
    </View>
  );
};

export default CountScreeen;
