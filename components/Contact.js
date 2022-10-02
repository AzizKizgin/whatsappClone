import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import {
  backColor,
  green,
  iconWhite,
  iconColor,
  titleWhite,
  x,
} from "../constants";
import { Icon } from "@rneui/base";

const Contact = ({ navigation, name, status, id }) => {
  return (
    <TouchableOpacity
      activeOpacity={100}
      onPress={() => {
        navigation.navigate("Chat", { name: name, id: id });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          margin: 10,
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
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
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: titleWhite, fontSize: 18 }}>{name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: iconColor }}>
              {status ? status : "Merhaba! Ben WhatsApp kullanıyorum."}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Contact;
