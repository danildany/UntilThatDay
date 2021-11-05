import React, { useState } from "react";
import { Text, View } from "react-native";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";

export default AddScreen = () => {
  let now = new Date().getTime();
  const [selectedDate, setSelectedDate] = useState("");
  let countDown = new Date(selectedDate).getTime();
  let distance = countDown - now;
  let dias = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DatePicker
        onSelectedChange={(date) => setSelectedDate(date)}
        minimumDate={getFormatedDate(new Date(), "YYYY/MM/DD h:m")}
        style={{
          borderRadius: 30,
          width: 350,
        }}
      />
      <Text
        style={{
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {"faltan " + dias + " dias"}
      </Text>
    </View>
  );
};
