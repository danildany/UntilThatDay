import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import DaysDate from "../data/DaysDate";
import uuid from "react-native-uuid";
import { getData, storeData } from "../data/dataManager";

export default AddScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [text, setText] = useState("");
  const navigation = useNavigation();

  const handleAction = async () => {
    const DataTotal = await getData();
    let id = uuid.v4();
    let title = text ? text : "Hasta ese dia...";
    let now = new Date().getTime();
    let countDown = new Date(selectedDate).getTime();
    const jsonValue = JSON.stringify(new DaysDate(id, title, now, countDown));
    DataTotal.push(jsonValue);

    storeData(DataTotal);
    navigation.navigate("StartScreen");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#20314D",
          flex: 1,
        }}
      >
        <View>
          <TextInput
            placeholder="Titulo"
            onChangeText={setText}
            value={text}
            style={{
              backgroundColor: "#32a4c6",
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <DatePicker
            onSelectedChange={(date) => setSelectedDate(date)}
            minimumDate={getFormatedDate(new Date(), "YYYY/MM/DD h:m")}
            options={{
              backgroundColor: "#090C08",
              textHeaderColor: "#FFA25B",
              textDefaultColor: "#F6E7C1",
              selectedTextColor: "#fff",
              mainColor: "#F4722B",
              textSecondaryColor: "#D6C7A1",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
          />
        </View>

        <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
          <Button
            color="springgreen"
            title="Guardar"
            onPress={handleAction}
            disabled={selectedDate ? false : true}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
