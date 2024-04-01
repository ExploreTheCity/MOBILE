import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Logo from "./components/Logo";
import COLORS from "./components/colors";
/* import {  Button } from "@react-native-material/core"; */
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [_, setUser] = useAuth();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
      params: {
        key: "AIzaSyCQG_URXefNRU5GPb29isou4E2ifu528l8",
      },
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .finally(() => {})
      .then(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, margin: 24, justifyContent: "center" }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Logo />
        <View style={{ flex: 1, marginBottom: 32 }}>
          <Text
            style={{ fontSize: 36, fontWeight: "600", color: COLORS.black }}
          >
            Create account
          </Text>
          <Text style={{ fontSize: 18, color: COLORS.black }}>
            Begin the journey
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            marginVertical: 8,
            color: COLORS.black,
          }}
        >
          Name Surname
        </Text>
        <View>
          <TextInput
            placeholder="Enter your name & surname"
            placeholderTextColor={COLORS.grey}
            value={name}
            onChangeText={setName}
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.grey,
              borderWidth: 2,
              borderRadius: 8,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            marginVertical: 8,
            color: COLORS.black,
          }}
        >
          Email Address
        </Text>
        <View>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor={COLORS.grey}
            value={email}
            onChangeText={setEmail}
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.grey,
              borderWidth: 2,
              borderRadius: 8,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            marginVertical: 8,
            color: COLORS.black,
          }}
        >
          Password
        </Text>
        <View>
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.grey}
            secureTextEntry={!isPasswordShown}
            value={password}
            onChangeText={setPassword}
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.grey,
              borderWidth: 2,
              borderRadius: 8,
              justifyContent: "center",
              paddingLeft: 20,
            }}
          />
          <Pressable
            style={{ position: "absolute", right: 12, top: 10 }}
            onPress={() => setIsPasswordShown(!isPasswordShown)}
          >
            <Ionicons
              name={isPasswordShown ? "eye" : "eye-off"}
              size={24}
              color={COLORS.black}
            />
          </Pressable>
        </View>
        {/* <View style={{
            flexDirection: "row",
            marginVertical: 2,
            marginTop: 12
          }}>
           <Checkbox
            style={{ marginRight: 4 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{fontSize:11}}> I agree to the terms and conditions </Text></View>
          <View/> */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 32,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            title="Login Instead"
            variant="text"
            compact
            onPress={handleLogin}
            color={COLORS.primary}
          />
          <Button
            style={buttonStyle.buttonColor}
            title="Register"
            onPress={handleRegister}
            loading={isLoading}
            color={COLORS.primary}
          />
        </View>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 24 }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: COLORS.grey,
            marginHorizontal: 10,
          }}
        />
        <Text style={{ fontSize: 14 }}>Or Sign Up with</Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: COLORS.grey,
            marginHorizontal: 10,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 24,
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => console.log("Pressed")}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: 48,
            borderWidth: 2,
            borderColor: COLORS.grey,
            borderRadius: 8,
            marginRight: 4,
          }}
        >
          <Image
            source={require("../assets/google.png")}
            style={{
              height: 36,
              width: 36,
              marginRight: 6,
            }}
            resizeMode="contain"
          />
          <Text>Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const buttonStyle = StyleSheet.create({
  buttonColor: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
});

export default Register;
