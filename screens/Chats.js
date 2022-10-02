// @ts-ignore
import {
  View,
  Text,
  // @ts-ignore
  Alert,
  TouchableOpacity,
  // @ts-ignore
  FlatList,
  ScrollView,
} from "react-native";
// @ts-ignore
// @ts-ignore
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FAB, Icon } from "@rneui/base";
import {
  // @ts-ignore
  // @ts-ignore
  backColor,
  green,
  iconColor,
  // @ts-ignore
  // @ts-ignore
  iconWhite,
  modalback,
  modalIconBack,
  titleWhite,
  // @ts-ignore
  // @ts-ignore
  topColor,
  modelIcon,
  x,
  // @ts-ignore
  // @ts-ignore
  y,
} from "../constants";
import { Modal, Portal, Provider } from "react-native-paper";
// @ts-ignore
// @ts-ignore
import Message from "../components/Message";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  collection,
  getFirestore,
  onSnapshot,
  // @ts-ignore
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../App";
import Contact from "../components/Contact";

const Chats = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const db = getFirestore(app);

  const auth = getAuth();

  // @ts-ignore
  // @ts-ignore
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      }
    });

    // @ts-ignore
    const qn = query(collection(db, auth.currentUser?.uid));

    onSnapshot(qn, (querySnapshot) => {
      let users = [];

      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data() });
      });

      // @ts-ignore
      setAllContacts(users);
    });
  }, [auth]);

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            // @ts-ignore
            style={{
              width: x / 1.5,
              height: x / 1.5,
              backgroundColor: modalback,
              marginHorizontal: x / 6,
              marginTop: 20,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Icon
              name="ios-person"
              type="ionicon"
              iconStyle={{
                color: modelIcon,
                alignSelf: "center",
                paddingTop: x / 20,
              }}
              size={190}
              style={{
                width: x / 1.7,
                height: x / 1.7,
                borderRadius: 1000,
                alignSelf: "center",
                backgroundColor: modalIconBack,
              }}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: modalback,
              }}
            >
              <Icon name="message" color={green} style={{ marginLeft: 10 }} />
              <Icon name="phone" type="material-community" color={green} />
              <Icon name="video-camera" type="font-awesome" color={green} />
              <Icon
                name="info"
                type="feather"
                color={green}
                style={{ marginRight: 10 }}
              />
            </View>
          </Modal>
        </Portal>

        <View>
          <TouchableOpacity activeOpacity={100}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
                marginLeft: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  paddingBottom: 10,
                }}
              >
                <Icon
                  name="archive-outline"
                  iconStyle={{ color: iconColor, width: 25, height: 25 }}
                  type="ionicon"
                  style={{
                    width: 30,
                    height: 30,
                    marginHorizontal: 15,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: titleWhite,
                    fontSize: 16,
                    fontWeight: "bold",
                    paddingBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  Arşivlenmiş
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  maxWidth: x,
                  alignItems: "flex-end",
                  marginRight: 20,
                }}
              >
                <Text
                  style={{
                    color: green,
                  }}
                >
                  1
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
        // @ts-ignore
        >
          {allContacts.map(
            (
              item,
              // @ts-ignore
              // @ts-ignore
              i
            ) => (
              <Contact
                navigation={navigation}
                // @ts-ignore
                name={item.name}
                // @ts-ignore
                id={item.id}
                status={null}
                key={Math.random().toString()}
              />
            )
          )}
        </ScrollView>
        <FAB
          placement="right"
          color={green}
          icon={{ name: "message", color: "white" }}
          onPress={() => {
            navigation.navigate("Contacts", { text: "" });
          }}
        />
      </View>
    </Provider>
  );
};

export default Chats;
