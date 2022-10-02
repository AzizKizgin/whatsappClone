import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { FAB, Icon } from "@rneui/base";
import {
  backColor,
  green,
  iconColor,
  iconWhite,
  modalback,
  modalIconBack,
  titleWhite,
  topColor,
  modelIcon,
  x,
  y,
} from "../constants";

const Message = ({ navigation, onPress, contactName, message, time, id }) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={100}
        onPress={() => {
          navigation.navigate("Chat", { name: contactName, id: id });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 10,
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>
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
              onPress={() => {
                onPress();
              }}
            />
          </View>
          <View style={{ alignSelf: "center", marginLeft: 10 }}>
            <Text style={{ color: titleWhite, fontSize: 18 }}>
              {contactName}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="checkmark"
                type="ionicon"
                color={iconColor}
                size={20}
                style={{ justifyContent: "center" }}
              />
              <Text style={{ color: iconColor }}>{message}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              maxWidth: x,
              alignItems: "flex-end",
            }}
          >
            <Text style={{ color: iconColor }}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Message;
