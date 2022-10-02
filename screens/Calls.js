import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { green, titleWhite } from "../constants";
import { FAB } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Calls = ({ navigation }) => {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      }
    });
  }, []);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text style={{ color: "gray", fontSize: 16 }}>
        WhatsApp kullanan kişileri aramak için {"\n"}
        ekranın aldtındaki simgeye dokunun
      </Text>
      <FAB
        placement="right"
        color={green}
        icon={{
          name: "phone-plus",
          type: "material-community",
          color: "white",
        }}
        onPress={() => {
          navigation.navigate("Contacts", { text: "araması" });
        }}
      />
    </View>
  );
};

export default Calls;
