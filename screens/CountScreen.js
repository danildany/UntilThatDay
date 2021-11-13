import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, Image } from "react-native";
import { getData, storeData } from "../data/dataManager";
import logo from "../assets/logo.png";

const CountScreen = ({ route }) => {
  const navigation = useNavigation();

  let end = route.params.dateInfo.end;
  let start = route.params.dateInfo.start;
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
      if (infoData.id == route.params.dateInfo.id) {
        data.splice(i, 1);
      }
    }
    storeData(data);
    navigation.navigate("StartScreen");
  };
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#20314D",
      }}
    >
      <View
        style={{
          top: 40,
          display: "flex",
          alignItems: "center",
          backgroundColor: "black",
          margin: 10,
          height: "80%",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            marginTop: 25,
            marginBottom: 30,
          }}
        >
          {route.params.dateInfo.title}
        </Text>
        <Image style={{ width: 150, height: 150 }} source={logo}></Image>
        <Text style={{ color: "#fff", marginTop: 25, marginBottom: 30 }}>
          {message}
        </Text>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#152030",
            width: "95%",
            height: 20,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#fff",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: "#32a4c6",
              width: `${progreso <= 100 ? progreso : "100"}%`,
              height: 20,
              display: "flex",
              alignItems: "center",
            }}
          ></View>
        </View>
        <View style={{ position: "absolute", bottom: 20, width: "95%" }}>
          <Button color="#32a4c6" title="Borrar" onPress={borrarInfo} />
        </View>
      </View>
    </View>
  );
};

export default CountScreen;
