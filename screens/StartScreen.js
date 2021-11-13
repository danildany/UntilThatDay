import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import logo from "../assets/logo.png";
import Home from "../Components/Home";

export default function StartScreen() {
  const edges = useSafeAreaInsets();

  const startAnimation = useRef(new Animated.Value(0)).current;

  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const contentTransition = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: Dimensions.get("window").width / 2 - 35,
            y: Dimensions.get("window").height / 2 - 15,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: Dimensions.get("window").height / 2 - 30,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#20314D",
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          zIndex: 1,
          backgroundColor: "#1c4f6c",
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View style={styles.view}>
          <TouchableOpacity
            style={{
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                { scale: scaleLogo },
              ],
            }}
          >
            <Animated.Image
              style={{
                width: 100,
                height: 100,
                paddingBottom: 10,
              }}
              source={logo}
            ></Animated.Image>
          </TouchableOpacity>

          <Animated.Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 25,
              transform: [{ scale: scaleTitle }, { translateY: moveTitle.y }],
            }}
          >
            Until that day...
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.04)",
          zIndex: 0,
          transform: [{ translateY: contentTransition }],
        }}
      >
        <Home></Home>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
