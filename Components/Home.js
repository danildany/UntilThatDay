import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
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
export default function Home() {
  const [info, setInfo] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@date_key");
      jsonValue != null ? setInfo(JSON.parse(jsonValue)) : setInfo([]);
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("linea 28 ", info);
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

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CountScreen", { dias: dias });
                }}
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(7,3,5,0.1)",
                  marginBottom: 10,
                  borderRadius: 5,
                  height: 200,
                }}
              >
                <Text>{days.title}</Text>
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
