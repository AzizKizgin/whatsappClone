import { View, Text } from "react-native";
import React from "react";
import { backColor } from "../constants";
import Message from "../components/Message";

const click = () => console.log();
const Archive = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: backColor }}>
      <View>
        <Message
          contactName={"Aziz"}
          message="Test Message"
          navigation={navigation}
          time="18.53"
          onPress={click}
        />
      </View>
    </View>
  );
};

export default Archive;
