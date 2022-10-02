// @ts-nocheck
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
import { getAuth } from "firebase/auth";

const ChatMessage = ({ contactName, message, time }) => {
  let flexDirection;
  let back = green;
  if (contactName === getAuth().currentUser?.displayName) {
    flexDirection = "flex-end";
  } else if (contactName !== getAuth().currentUser?.displayName) {
    flexDirection = "flex-start";
    back = topColor;
  }

  return (
    <View
      style={{
        alignSelf: flexDirection,
        width: "auto",
        backgroundColor: back,
        marginVertical: 10,
        borderRadius: 10,
        padding: 5,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 5,
            marginBottom: 10,
            maxWidth: x / 1.8,
            color: titleWhite,
          }}
        >
          {message}
        </Text>
        <Text
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 5,
            marginTop: 10,
            color: iconWhite,
          }}
        >
          {time.split(" ", 1)}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
