import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@date_key");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@date_key", JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};
