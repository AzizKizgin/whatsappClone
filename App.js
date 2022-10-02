// @ts-nocheck
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, signOut } from "firebase/auth";

import Chats from "./screens/Chats";
import Status from "./screens/Status";
import Calls from "./screens/Calls";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { backColor, green, iconWhite, titleWhite, topColor } from "./constants";
import Contacts from "./screens/Contacts";
import Archive from "./screens/Archive";
import Chat from "./screens/Chat";
import { Alert } from "react-native";

import { getFirestore } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQx-8XYiCvVFvTl6VR3QlM0hK5JkRVLyQ",
  authDomain: "whatsappclone-d06eb.firebaseapp.com",
  projectId: "whatsappclone-d06eb",
  storageBucket: "whatsappclone-d06eb.appspot.com",
  messagingSenderId: "756388013951",
  appId: "1:756388013951:web:81c1410766b630c17e5c4a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      sceneContainerStyle={{ backgroundColor: backColor }}
      screenOptions={{ tabBarStyle: { backgroundColor: topColor } }}
    >
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarActiveTintColor: green,
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: green },
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarLabel: "Sohbetler",
        }}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarActiveTintColor: green,
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: { backgroundColor: green },
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarLabel: "Durum",
        }}
      />
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: green,
          tabBarIndicatorStyle: { backgroundColor: green },
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarLabel: "Aramalar",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerStyle: { backgroundColor: topColor },
          headerTitle: "WhatsApp",
          headerTitleStyle: { color: "gray" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Navigator"
          component={AppNavigator}
          options={{
            headerBackVisible: false,
            headerRight: () => (
              <>
                <Icon name="search" color="gray" />
                <Icon
                  name="dots-vertical"
                  color="gray"
                  type="material-community"
                  style={{ marginLeft: 10 }}
                  onPress={({ navigation }) => {
                    Alert.alert("Çıkış", "Çıkış Yapmak İstiyor Musunuz?", [
                      {
                        text: "Çıkış Yap",
                        onPress: () => {
                          const auth = getAuth();
                          signOut(auth).then(() => {});
                        },
                      },
                      {
                        text: "Iptal",
                        cancelable: true,
                      },
                    ]);
                  }}
                />
              </>
            ),
          }}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{
            headerTitle: "Kişi Seç",
            headerTintColor: titleWhite,
            headerTitleStyle: { color: titleWhite },
          }}
        />
        <Stack.Screen
          name="Archive"
          component={Archive}
          options={{
            headerTitle: "Arşivlenmiş",
            headerTintColor: titleWhite,
            headerTitleStyle: { color: titleWhite },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({
            headerTitle: route.params.name,
            headerTintColor: titleWhite,
            headerTitleStyle: { color: titleWhite },
            headerRight: () => (
              <>
                <Icon
                  name="videocam"
                  color={iconWhite}
                  type="material"
                  size={28}
                  style={{ marginRight: 20 }}
                />
                <Icon
                  name="phone"
                  color={iconWhite}
                  type="font-awesome"
                  style={{ marginRight: 20 }}
                />
                <Icon
                  name="dots-vertical"
                  color={iconWhite}
                  type="material-community"
                  onPress={() => {}}
                />
              </>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
