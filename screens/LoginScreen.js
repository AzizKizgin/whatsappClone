import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@rneui/base";
import {
  backColor,
  green,
  iconWhite,
  titleWhite,
  topColor,
  x,
} from "../constants";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useLayoutEffect } from "react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Navigator");
      }
    });
  });

  const SignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Navigator");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backColor,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View>
        <Input
          keyboardType="email-address"
          placeholder="E-Mail"
          style={{
            backgroundColor: topColor,
            paddingHorizontal: 5,
            color: "white",
          }}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Input
          placeholder="Password"
          style={{
            backgroundColor: topColor,
            paddingHorizontal: 5,
            color: "white",
          }}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />
        <Button
          title={"Giriş Yap"}
          titleStyle={{ color: iconWhite }}
          buttonStyle={{ backgroundColor: green, marginHorizontal: 10 }}
          onPress={SignIn}
        />
        <Text
          style={{ color: titleWhite, alignSelf: "flex-end", margin: 10 }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Kayıt Ol
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
