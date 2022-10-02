import {
  View,
  // @ts-ignore
  Text,
  ImageBackground,
  TextInput,
  // @ts-ignore
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import {
  backColor,
  green,
  iconColor,
  iconWhite,
  titleWhite,
  x,
  y,
} from "../constants";
import { Icon } from "@rneui/base";
import { useState, useEffect } from "react";
// @ts-ignore

import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../App";
// @ts-ignore
import Message from "../components/Message";
import ChatMessage from "../components/ChatMessage";
// @ts-ignore

// @ts-ignore
const Chat = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const auth = getAuth();
  const db = getFirestore(app);
  const { name, id } = route.params;
  // @ts-ignore
  const currentUser = auth.currentUser.displayName;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hour = new Date().getHours();
  var minute = new Date().getMinutes();

  const [allMessages, setAllMessages] = useState([]);
  // @ts-ignore
  const [allContacts, setAllContacts] = useState([]);
  // @ts-ignore
  const scrollViewRef = React.useRef();
  const [can, setCan] = useState(false);

  // @ts-ignore

  useEffect(() => {
    let dbName = "a";

    // @ts-ignore
    if (id < getAuth().currentUser.uid) {
      dbName = name + "-" + currentUser;
      // @ts-ignore
    } else if (id > getAuth().currentUser.uid) {
      dbName = currentUser + "-" + name;
    }
    const q = query(collection(db, dbName), orderBy("timeStamp"));

    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      // @ts-ignore

      setAllMessages(messages);
    });

    // @ts-ignore
    const qn = query(
      // @ts-ignore
      collection(db, auth.currentUser?.uid)
    );

    onSnapshot(qn, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data() });
      });
      // @ts-ignore
      setAllContacts(users);

      if (allContacts.length === 0) {
        setCan(true);
      }

      allContacts.forEach((item) => {
        // @ts-ignore

        if (item.id === id) {
          setCan(false);
        }
      });
    });
  }, [message]);

  const sendMessage = async (msg) => {
    try {
      if (message != "") {
        let dbName = "";

        // @ts-ignore
        if (id < auth.currentUser.uid) {
          dbName = name + "-" + currentUser;
          // @ts-ignore
        } else if (id > getAuth().currentUser.uid) {
          dbName = currentUser + "-" + name;
        }
        await addDoc(collection(db, dbName), {
          name: auth.currentUser?.displayName,
          message: msg,
          time:
            hour.toString() +
            "." +
            minute.toString() +
            " " +
            date.toString() +
            "." +
            month.toString() +
            "." +
            year.toString(),
          timeStamp: Date.now(),
        });

        if (can) {
          // @ts-ignore
          await addDoc(collection(db, auth.currentUser?.uid), {
            name: name,
            id: id,
            timeStamp: Date.now(),
          });
          await addDoc(collection(db, id), {
            name: auth.currentUser?.displayName,
            id: auth.currentUser?.uid,
            timeStamp: Date.now(),
          });
        }
      }
    } catch (e) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        // @ts-ignore
        source={require("../assets/wallpaper.jpg")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          <ScrollView
            // @ts-ignore
            ref={
              // @ts-ignore
              scrollViewRef
            }
            nestedScrollEnabled={true}
            // @ts-ignore
            onContentSizeChange={(contentWidth, contentHeight) => {
              // @ts-ignore
              scrollViewRef.current?.scrollTo({ y: contentHeight });
            }}
          >
            {allMessages.map(
              (
                item,
                // @ts-ignore
                i
              ) => (
                <ChatMessage
                  // @ts-ignore
                  contactName={item.name}
                  // @ts-ignore
                  message={item.message}
                  // @ts-ignore
                  time={item.time}
                  key={Math.random().toString()}
                />
              )
            )}
          </ScrollView>
        </View>
        <View
          style={{
            height: y / 12,
            justifyContent: "flex-end",
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: backColor,
                width: x / 1.2,
                height: 50,
                marginBottom: 5,
                marginHorizontal: 2,
                borderRadius: 50,
                flexDirection: "row",
              }}
            >
              <Icon
                name="happy"
                type="ionicon"
                color={iconColor}
                size={30}
                style={{
                  justifyContent: "center",
                  marginVertical: 10,
                  marginLeft: 10,
                }}
              />
              <TextInput
                style={{
                  margin: 10,
                  fontSize: 18,
                  color: titleWhite,
                  width: x / 2,
                }}
                placeholder="Mesaj"
                value={message}
                onChangeText={(value) => {
                  setMessage(value);
                  setVisible(true);
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="paperclip"
                    type="font-awesome"
                    color={iconColor}
                  />
                  <Icon
                    name="camera"
                    type="font-awesome"
                    color={iconColor}
                    style={{ marginLeft: 15 }}
                    size={20}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                marginBottom: 5,
                marginHorizontal: 5,
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: green,
              }}
            >
              {!visible ? (
                <Icon
                  name="keyboard-voice"
                  type="material"
                  size={30}
                  color={iconWhite}
                />
              ) : (
                <Icon
                  name="send"
                  type="material"
                  size={30}
                  color={iconWhite}
                  onPress={() => {
                    setVisible(false);
                    sendMessage(message);
                    setMessage("");
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Chat;
