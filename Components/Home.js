import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Animated, Dimensions, Image, ScrollView, View } from "react-native";
import post1 from "../assets/post1.jpeg";
import post2 from "../assets/post2.jpeg";
import post3 from "../assets/post3.jpeg";
import post4 from "../assets/post4.jpeg";
import post5 from "../assets/post5.jpeg";
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
          {info.reverse().map((item, index) => {
            let now = new Date().getTime();
            let days = JSON.parse(item);
            let distance = days.end - now;
            let dias = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
            let progreso = Math.round(
              ((now - days.start) / (days.end - days.start)) * 100
            );
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CountScreen", {
                    dias: dias,
                    days: days,
                  });
                }}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(7,3,5,0.1)",
                  marginBottom: 10,
                  borderRadius: 5,
                  height: 150,
                }}
              >
                <Text>{days.title}</Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "blue",
                    width: "90%",
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
              </TouchableOpacity>
              // <Image
              //   source={item}
              //   key={index}
              //   style={{
              //     width: -Dimensions.get("window").width - 30,
              //     height: 250,
              //     borderRadius: 15,
              //     marginTop: 20,
              //   }}
              // ></Image>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
