import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { FavoritesProvider } from "./screens/components/FavoritesContext";
import AuthProvider, { useAuth } from "./screens/AuthContext";
import TabNavigation from "./screens/navigations/TabNavgiation";
import CityDetail from "./screens/components/CityDetail";
import TravelHacks from "./screens/TravelHacks";
import Food from "./screens/Food";
import Transportation from "./screens/Transportation";
import Hotels from "./screens/Hotels";
import Restaurants from "./screens/Restaurants";
import Activities from "./screens/Activities";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [user] = useAuth();

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={TabNavigation} />
        <Stack.Screen name="CityDetail" component={CityDetail} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="CityDetail" component={CityDetail} />
      <Stack.Screen name="TravelHacks" component={TravelHacks} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="Transportation" component={Transportation} />
      <Stack.Screen name="Hotels" component={Hotels} />
      <Stack.Screen name="Restaurants" component={Restaurants} />
      <Stack.Screen name="Activities" component={Activities} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  /*  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []); */

  return (
    <NavigationContainer>
      <AuthProvider>
        <FavoritesProvider>
          <Navigator />
        </FavoritesProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
