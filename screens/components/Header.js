import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import COLORS from "./colors";

export default function Header() {
  return (
    <View>
      <View
        style={{
          backgroundColor: COLORS.secondary,
          alignItems: "stretch",
          justifyContent: "space-between",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 36, fontWeight: 700 }}>Discover </Text>
            <Text style={{ fontSize: 30, fontWeight: 600 }}>
              the world today{" "}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>
              Welcome, explorer!
            </Text>
          </View>
          <Image
            source={require("./../../assets/avatar.png")}
            style={styles.avatar}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
  },
});
