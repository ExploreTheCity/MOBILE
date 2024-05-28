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

const TravelHacks = ({ navigation }) => {
  const travelHacks = [
    {
      id: "1",
      title: "Pack Light",
      description:
        "Traveling with less luggage can save you time and hassle at airports and train stations. Pack only the essentials and consider doing laundry during longer trips.",
    },
    {
      id: "2",
      title: "Use Packing Cubes",
      description:
        "Packing cubes can help keep your belongings organized and compact. They are especially useful when you need to access certain items without unpacking everything.",
    },
    {
      id: "3",
      title: "Download Offline Maps",
      description:
        "Offline maps can be a lifesaver when you don’t have internet access. Download maps of your destination to navigate without using data.",
    },
  ];

  const renderTravelHackItem = ({ item }) => (
    <View style={styles.tipItem}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://media.theeverygirl.com/wp-content/uploads/2023/06/travel-hacks-the-everygirl-4-1.png",
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
        <Text style={styles.screenTitle}>Travel Hacks</Text>
      </ImageBackground>

      <FlatList
        data={travelHacks}
        renderItem={renderTravelHackItem}
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

export default TravelHacks;
