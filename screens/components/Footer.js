import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLORS from "./colors";

export default function Footer() {
  return (
    <View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Turkey Guide © Explore the City 2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 12,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: COLORS.grey,
  },
});
