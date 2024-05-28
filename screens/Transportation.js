import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "./components/colors";

const Transportation = ({ navigation }) => {
  const transportationTips = [
    {
      id: "1",
      title: "Public Transportation",
      description:
        "Use public transportation when possible to save money and experience the local culture. Research routes and schedules ahead of time.",
    },
    {
      id: "2",
      title: "Taxi and Rideshare",
      description:
        "Be cautious when using taxis and rideshare services. Verify the driver and vehicle information before getting in.",
    },
    {
      id: "3",
      title: "Renting a Car",
      description:
        "Rent a car for flexibility and convenience, especially in areas with limited public transportation. Familiarize yourself with local driving laws and regulations.",
    },
  ];

  const renderTransportationTipItem = ({ item }) => (
    <View style={styles.tipItem}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://media.wired.com/photos/62e321fc9879dca150ec3195/4:3/w_2131,h_1598,c_limit/Case-For-Making-Public-Transportation-Free-Business-1241916450.jpg",
        }}
        style={styles.headerBackground}
        imageStyle={styles.headerBackgroundImage}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="COLORS.primary" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Transportation Tips</Text>
      </ImageBackground>

      <FlatList
        data={transportationTips}
        renderItem={renderTransportationTipItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBackground: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackgroundImage: {
    opacity: 0.8,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 16,
    padding: 10,
    zIndex: 1,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "black",
    position: "absolute",
    bottom: 16,
    left: 24,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  tipItem: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  tipDescription: {
    fontSize: 16,
    color: COLORS.dark,
    lineHeight: 22,
  },
});

export default Transportation;
