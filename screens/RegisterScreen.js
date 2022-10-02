import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@rneui/base";
import {
  backColor,
  green,
  iconWhite,
  titleWhite,
  topColor,
} from "../constants";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../App";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const db = getFirestore(app);

  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // @ts-ignore
            saveUserName(name, email, user.uid);
            navigation.navigate("Login");
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });

    const saveUserName = async (name, email, userUid) => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          id: userUid,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
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
          placeholder="Ad"
          style={{
            backgroundColor: topColor,
            paddingHorizontal: 5,
            color: "white",
          }}
          onChangeText={(value) => {
            setName(value);
          }}
        />

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
          title={"Kayıt Ol"}
          titleStyle={{ color: iconWhite }}
          buttonStyle={{ backgroundColor: green, marginHorizontal: 10 }}
          onPress={register}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
