import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  backColor,
  green,
  iconWhite,
  iconColor,
  titleWhite,
  x,
} from "../constants";
import { Icon } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Status = ({ navigation }) => {
  useLayoutEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      }
    });
  });
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
        }}
      >
        <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
          <Icon
            name="ios-person"
            type="ionicon"
            iconStyle={{
              color: iconWhite,
              alignSelf: "center",
              marginTop: 5,
            }}
            size={40}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: iconColor,
            }}
          />
          <View
            style={{
              justifyContent: "flex-end",
              right: 20,
              top: 5,
            }}
          >
            <Icon
              name="plus"
              type="feather"
              iconStyle={{
                color: iconWhite,
                justifyContent: "center",
                alignContent: "center",
              }}
              size={20}
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
                backgroundColor: green,
                borderWidth: 2,
                borderColor: backColor,
              }}
            />
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: titleWhite, fontSize: 18 }}>Durumum</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: iconColor }}>
              Durum güncellemesi eklemek için dokunun
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Status;
