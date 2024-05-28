import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "./../components/colors";
import { citiesData } from "./constants";
import { FavoritesContext } from "./FavoritesContext";
import Maps from "./maps";

const initialComments = [
  {
    id: 1,
    text: "Amazing place!",
    author: "John Doe",
    profilePic:
      "https://cdn1.vectorstock.com/i/1000x1000/63/15/stylish-young-man-avatar-or-userpic-in-flat-design-vector-17126315.jpg",
  },
  {
    id: 2,
    text: "Had a great time.",
    author: "Jane Smith",
    profilePic:
      "https://cdn2.vectorstock.com/i/1000x1000/37/51/young-guy-avatar-person-flat-design-icon-vector-27923751.jpg",
  },
  {
    id: 3,
    text: "Must go!",
    author: "Bob Johnson",
    profilePic:
      "https://cdn4.vectorstock.com/i/1000x1000/37/68/young-guy-avatar-person-flat-design-icon-vector-27923768.jpg",
  },
  {
    id: 4,
    text: "Loved it!",
    author: "Alice Davis",
    profilePic:
      "https://cdn3.vectorstock.com/i/1000x1000/37/67/young-woman-character-person-flat-design-icon-vector-27923767.jpg",
  },
];

export default class CityDetail extends Component {
  static contextType = FavoritesContext;

  constructor(props) {
    super(props);
    this.state = {
      city: {},
      description: "",
      isFavorite: false,
      comments: initialComments,
      newCommentText: "",
      currentUser: "",
      currentUserProfilePic: "",
      selectedCategory: "",
    };
  }

  async componentDidMount() {
    const { cityId } = this.props.route.params;
    const { favorites } = this.context;
    const city = citiesData.find((city) => city.id === cityId) || {};
    const isFavorite = favorites.some((city) => city.id === cityId);

    const userName = await AsyncStorage.getItem("@user_name");
    const userProfilePic = await AsyncStorage.getItem("@user_profile_pic");

    let savedComments = [];
    try {
      const storedComments = await AsyncStorage.getItem(`@comments_${cityId}`);
      if (storedComments) {
        savedComments = JSON.parse(storedComments);
      }
    } catch (error) {
      console.log("Error loading comments:", error.message);
    }

    this.setState({
      city,
      isFavorite,
      currentUser: userName || "User",
      currentUserProfilePic:
        userProfilePic ||
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      comments: savedComments,
    });
  }

  handleButtonPress = (text) => {
    const { city } = this.state;
    let newDescription = "";
    if (text === "touristic") {
      newDescription = `Explore ${city.name}'s most touristic places.`;
    } else if (text === "restaurants") {
      newDescription = `Explore ${city.name}'s most liked restaurants.`;
    } else if (text === "map") {
      newDescription =
        "How to go? Start a road to explore this wonderful place!";
    }
    this.setState({ description: newDescription, selectedCategory: text });
  };

  toggleFavorite = () => {
    const { cityId } = this.props.route.params;
    const { favorites, addFavorite, removeFavorite } = this.context;
    const city = citiesData.find((city) => city.id === cityId);

    if (this.state.isFavorite) {
      removeFavorite(cityId);
    } else {
      addFavorite(city);
    }

    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));
  };

  addComment = async () => {
    const { cityId } = this.props.route.params;
    const { newCommentText, comments, currentUser, currentUserProfilePic } =
      this.state;

    if (newCommentText.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        text: newCommentText,
        author: currentUser,
        profilePic: currentUserProfilePic,
      };

      const updatedComments = [newComment, ...comments];

      this.setState({
        comments: updatedComments,
        newCommentText: "",
      });

      try {
        await AsyncStorage.setItem(
          `@comments_${cityId}`,
          JSON.stringify(updatedComments)
        );
      } catch (error) {
        console.log("Error saving comments:", error.message);
      }
    }
  };

  deleteComment = async (commentId) => {
    const { cityId } = this.props.route.params;
    const updatedComments = this.state.comments.filter(
      (comment) => comment.id !== commentId
    );

    this.setState({
      comments: updatedComments,
    });

    try {
      await AsyncStorage.setItem(
        `@comments_${cityId}`,
        JSON.stringify(updatedComments)
      );
    } catch (error) {
      console.log("Error deleting comment:", error.message);
    }
  };
  renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.commentTextContainer}>
        <Text style={styles.commentText} numberOfLines={3} ellipsizeMode="tail">
          {item.text}
        </Text>
        <Text style={styles.commentAuthor}>{item.author}</Text>
      </View>
      {item.author === this.state.currentUser && (
        <TouchableOpacity
          onPress={() => this.deleteComment(item.id)}
          style={{ marginLeft: "auto" }}
        >
          <Ionicons name="trash-bin" size={16} color="#ff5959" />
        </TouchableOpacity>
      )}
    </View>
  );

  render() {
    const { navigation } = this.props;
    const { city, comments, newCommentText, selectedCategory } = this.state;
    console.log(city);
    const { touristicPlaces, restaurants } = city;
    const { favorites } = this.context;
    const isFavorite = favorites.some((item) => item.id === city.id);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={{ uri: city.image }} style={styles.cityImage} />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.toggleFavorite}
            style={styles.iconButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.description}>{city.description}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleButtonPress("touristic")}
            >
              <Text style={styles.buttonText}>Touristic Places</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleButtonPress("restaurants")}
            >
              <Text style={styles.buttonText}>Restaurants</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleButtonPress("map")}
            >
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.selectedDescription}>
            {this.state.description}
          </Text>

          {selectedCategory === "touristic" && (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Touristic Places</Text>
              {touristicPlaces &&
                touristicPlaces.map((place, index) => (
                  <View key={index} style={styles.placeContainer}>
                    <Text style={styles.placeName}>
                      {place.name}{" "}
                      <Ionicons name="star" size={15} color="orange" />{" "}
                      {place.rating}
                    </Text>
                    <Text style={styles.placeDescription}>
                      {place.description}
                    </Text>
                  </View>
                ))}
            </View>
          )}

          {selectedCategory === "restaurants" && (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Restaurants</Text>
              {restaurants &&
                restaurants.map((restaurant, index) => (
                  <View key={index} style={styles.placeContainer}>
                    <Text style={styles.placeName}>
                      {restaurant.name}{" "}
                      <Ionicons name="star" size={15} color="orange" />{" "}
                      {restaurant.rating}
                    </Text>
                    <Text style={styles.placeDescription}>
                      {restaurant.description}
                    </Text>
                  </View>
                ))}
            </View>
          )}

          {selectedCategory === "map" && (
            <View>
              <Maps latitude={city.latitude} longitude={city.longitude} />
            </View>
          )}

          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <FlatList
              data={comments}
              renderItem={this.renderCommentItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={1}
            />
          </View>

          <View style={styles.addCommentContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newCommentText}
              onChangeText={(text) => this.setState({ newCommentText: text })}
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={this.addComment}
            >
              <Text style={styles.commentButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginBottom: 12,
    columnGap: 24,
  },
  cityImage: {
    width: "100%",
    height: "55%",
    position: "absolute",
    top: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 40,
    paddingHorizontal: 16,
    position: "absolute",
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 20,
  },
  content: {
    marginTop: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.grey,
    paddingTop: 24,
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 20,
  },
  cityName: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e5e3e3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  categoryContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  placeContainer: {
    marginBottom: 20,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  placeDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  mapContainer: {
    marginTop: 20,
  },
  mapDescription: {
    fontSize: 14,
    color: "#666",
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentTextContainer: {
    marginLeft: 10,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  commentAuthor: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 48,
  },
  commentInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  commentButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});
