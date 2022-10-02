// @ts-nocheck
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  backColor,
  green,
  iconWhite,
  iconColor,
  titleWhite,
  x,
} from "../constants";
import { Icon } from "@rneui/base";
import Contact from "../components/Contact";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../App";
import { getAuth } from "firebase/auth";

const Contacts = ({ route, navigation }) => {
  const { text } = route.params;
  const [users, setUsers] = useState([]);

  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allusers = [];
      querySnapshot.forEach((doc) => {
        allusers.push({ ...doc.data() });
      });
      // @ts-ignore
      setUsers(allusers);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ backgroundColor: backColor, flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            marginTop: 20,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Icon
              name="group"
              type="material"
              iconStyle={{ color: iconWhite }}
              size={30}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: green,
                justifyContent: "center",
              }}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={{ color: titleWhite, fontSize: 18 }}>
              Yeni grup {text}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            marginTop: 20,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Icon
              name="person-add"
              type="ionicon"
              iconStyle={{ color: iconWhite }}
              size={25}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: green,
                justifyContent: "center",
              }}
            />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={{ color: titleWhite, fontSize: 18 }}>Yeni kişi</Text>
          </View>
          <Icon
            name="qr-code-outline"
            type="ionicon"
            iconStyle={{ color: iconColor }}
            size={25}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: backColor,
              justifyContent: "center",
              marginLeft: x / 2 - 20,
            }}
          />
        </View>
      </View>

      <Text
        style={{
          color: "gray",
          margin: 20,
          fontSize: 15,
        }}
      >
        WhatsApp'taki kişiler
      </Text>

      <View>
        <FlatList
          style={{ marginBottom: 20 }}
          // @ts-ignore
          data={users}
          // @ts-ignore
          renderItem={(item) =>
            item.item.name !== getAuth().currentUser?.displayName ? (
              // @ts-ignore
              <Contact
                navigation={navigation}
                name={item.item.name}
                id={item.item.id}
                status={null}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default Contacts;
