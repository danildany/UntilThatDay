import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { getData, storeData } from "../data/dataManager";

const CountScreeen = ({ route }) => {
  const navigation = useNavigation();

  let end = route.params.days.end;
  let start = route.params.days.start;
  let now = new Date().getTime();
  let distance = end - now;
  let dias = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
  let progreso = Math.round(((now - start) / (end - start)) * 100);
  let message = "";
  if (dias == 1) {
    message = "Falta 1 dia.";
  } else if (dias == 0) {
    message = "Hoy es el dia.";
  } else if (dias < 0) {
    message = `El dia ya pasado.`;
  } else {
    message = `Faltan ${dias} dias.`;
  }
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
      <Text>{message}</Text>
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
            width: `${progreso <= 100 ? progreso : "100"}%`,
            height: 20,
            display: "flex",
            alignItems: "center",
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
