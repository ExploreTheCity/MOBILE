import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import COLORS from "./components/colors";

const Profile = () => {
  const [user, setUser] = useAuth();
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [points, setPoints] = useState(0);
  const [favoriteCitiesCount, setFavoriteCitiesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const name = await AsyncStorage.getItem("@user_name");
      const email = await AsyncStorage.getItem("@user_email");
      const image = await AsyncStorage.getItem("@profile_image");
      const points = await AsyncStorage.getItem("@user_points");
      const favoriteCities = await AsyncStorage.getItem("@favorite_cities");
      const comments = await AsyncStorage.getItem("@user_comments");
      setUserInfo({ name: name || "", email: email || "" });
      setProfileImage(image);
      setPoints(points ? parseInt(points) : 0);
      setFavoriteCitiesCount(
        favoriteCities ? JSON.parse(favoriteCities).length : 0
      );
      setCommentsCount(comments ? JSON.parse(comments).length : 0);
    };

    fetchUserInfo();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const commentsData = await AsyncStorage.getItem("@user_comments");
    if (commentsData) {
      setComments(JSON.parse(commentsData));
    }
  };

  const addComment = async (comment) => {
    const newComment = {
      id: comments.length + 1,
      text: comment,
      cityId: currentCity.id,
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    await AsyncStorage.setItem(
      "@user_comments",
      JSON.stringify(updatedComments)
    );
  };

  const handleDeleteComment = async (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    await AsyncStorage.setItem(
      "@user_comments",
      JSON.stringify(updatedComments)
    );
  };

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.clear();
          setUser(null);
          navigation.navigate("Welcome");
        },
      },
    ]);
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      await AsyncStorage.setItem("@profile_image", result.uri);
    }
  };

  const handlePasswordChange = async () => {
    Alert.alert(
      "Password Changed",
      "Your password has been changed successfully."
    );
    setPasswordModalVisible(false);
  };

  const handleNameChange = async () => {
    await AsyncStorage.setItem("@user_name", newName);
    setUserInfo((prev) => ({ ...prev, name: newName }));
    Alert.alert("Name Changed", "Your name has been changed successfully.");
    setNameModalVisible(false);
  };

  const renderCommentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.commentItem}
      onPress={() => navigation.navigate("CityDetail", { cityId: item.cityId })}
    >
      <Text style={styles.commentText}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
        <FontAwesome name="trash" size={16} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <FontAwesome name="arrow-left" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.profileImageContainer}
        >
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            style={styles.profileImage}
          />
          <FontAwesome
            name="camera"
            size={18}
            color={COLORS.white}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{userInfo.name || user?.name}</Text>
        <Text style={styles.email}>{userInfo.email || user?.email}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setNameModalVisible(true)}
        >
          <FontAwesome name="edit" size={16} color={COLORS.primary} />
          <Text style={styles.buttonText}>Edit Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setPasswordModalVisible(true)}
        >
          <FontAwesome name="lock" size={16} color={COLORS.primary} />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={16} color={COLORS.primary} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isPasswordModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={handlePasswordChange}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => setPasswordModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isNameModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="New Name"
              value={newName}
              onChangeText={setNewName}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={handleNameChange}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => setNameModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{points}</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favoriteCitiesCount}</Text>
            <Text style={styles.statLabel}>Fav Cities</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{commentsCount}</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/ai-generated-illustration-vacation-tropical-sunny-beach-beautiful-sand_441362-4051.jpg",
            }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Create a route and start exploring!
            </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Look at the routes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://static-00.iconduck.com/assets.00/thinking-person-7-illustration-1730x2048-esrs6loz.png",
            }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              A few suggestions before going on a trip?
            </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Read this</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/002/176/052/original/a-girl-is-sitting-in-a-restaurant-and-thinking-about-the-menu-vector.jpg",
            }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Are you hungry?</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>
                Take a look at the restaurants
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebe9fe",
  },
  header: {
    position: "relative",
    alignItems: "center",
    padding: 16,
  },
  iconButton: {
    position: "absolute",
    left: 14,
    top: 14,
    zIndex: 1,
  },
  profileImageContainer: {
    marginTop: 16,
    borderColor: "#9c89fc",
    borderWidth: 2,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 164,
    height: 164,
    borderRadius: 164,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#9c89fc",
    padding: 6,
    borderRadius: 20,
  },
  content: {
    marginTop: "10%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 36,
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 40,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "500",
    color: COLORS.black,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9c89fc",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  buttonText: {
    color: "#f3f3f4",
    marginLeft: 6,
    fontWeight: "500",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
  },
  horizontalScroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteItem: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  favoriteText: {
    color: COLORS.white,
  },
  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentText: {
    color: COLORS.white,
    flex: 1,
  },
  commentList: {
    paddingBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: "500",
    color: COLORS.white,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 6,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: "#9c89fc",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 8,
  },
  linkText: {
    fontSize: 15,
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    marginHorizontal: 4,
    backgroundColor: "#ebe9fe",
    borderRadius: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
});

export default Profile;
