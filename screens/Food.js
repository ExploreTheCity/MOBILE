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

const Food = ({ navigation }) => {
  const foodTips = [
    {
      id: "1",
      title: "Try Local Cuisine",
      description:
        "When visiting a new city, don’t miss the chance to try local cuisine. You can experience the culture through its food by dining at local restaurants, trying street food, or visiting markets.",
    },
    {
      id: "2",
      title: "Check Dining Hours",
      description:
        "Meal times can vary, and some restaurants may close early. Plan ahead to make sure you get to experience the local flavors when they’re available.",
    },
    {
      id: "3",
      title: "Practice Food Safety",
      description:
        "When preparing meals, follow food safety guidelines such as cooking meat thoroughly and storing food at proper temperatures. This ensures a safe and enjoyable culinary experience during your travels.",
    },
    {
      id: "4",
      title: "Practice Food Safety",
      description:
        "When preparing meals, follow food safety guidelines such as cooking meat thoroughly and storing food at proper temperatures. This ensures a safe and enjoyable culinary experience during your travels.",
    },
  ];

  const renderFoodTipItem = ({ item }) => (
    <View style={styles.tipItem}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://signsofthetimes.org.au/wp-content/uploads/sites/3/2019/04/Pg44-GettyImages-1022032906-2-2.jpg",
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
        <Text style={styles.screenTitle}>Food Tips</Text>
      </ImageBackground>

      <FlatList
        data={foodTips}
        renderItem={renderFoodTipItem}
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

export default Food;
