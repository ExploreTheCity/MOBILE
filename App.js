import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Register from "./screens/Register";
import AuthProvider, { useAuth } from "./screens/AuthContext";
import TabNavigation from "./screens/navigations/TabNavgiation";
import CityDetail from "./screens/components/CityDetail";

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
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
