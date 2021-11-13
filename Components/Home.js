import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ScrollView, View } from "react-native";
import { getData } from "../data/dataManager";

export default function Home() {
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
    let res = await getData();
    setInfo(res);
  };
  useFocusEffect(
    React.useCallback(() => {
      getInfo();
    }, [])
  );
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 100,
            paddingBottom: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddScreen");
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-around",
              backgroundColor: "#2E7355",

              marginBottom: 20,
              paddingLeft: 20,
              borderRadius: 5,
              height: 50,
            }}
          >
            <Text style={{ color: "#fff" }}>Agregar</Text>
          </TouchableOpacity>
          {info.reverse().map((item, index) => {
            let now = new Date().getTime();
            let dateInfo = JSON.parse(item);
            let progreso = Math.round(
              ((now - dateInfo.start) / (dateInfo.end - dateInfo.start)) * 100
            );
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CountScreen", {
                    dateInfo: dateInfo,
                  });
                }}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-around",
                  backgroundColor: "black",
                  borderColor: "white",
                  borderWidth: 1,
                  marginBottom: 20,
                  paddingLeft: 20,
                  borderRadius: 5,
                  height: 100,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}
                >
                  {dateInfo.title}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#152030",
                    width: "90%",
                    height: 20,
                    borderRadius: 50,
                    borderColor: "#fff",
                    borderWidth: 2,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#32a4c6",
                      width: `${progreso}%`,
                      height: 20,
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
