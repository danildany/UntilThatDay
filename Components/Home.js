import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Dimensions, Image, ScrollView, View } from "react-native";
import post1 from "../assets/post1.jpeg";
import post2 from "../assets/post2.jpeg";
import post3 from "../assets/post3.jpeg";
import post4 from "../assets/post4.jpeg";
import post5 from "../assets/post5.jpeg";
export default function Home() {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 120,
            paddingBottom: 25,
          }}
        >
          {[post1, post2, post3, post4, post5].map((item, index) => {
            return (
              <Image
                source={item}
                key={index}
                style={{
                  width: -Dimensions.get("window").width - 30,
                  height: 250,
                  borderRadius: 15,
                  marginTop: 20,
                }}
              ></Image>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
