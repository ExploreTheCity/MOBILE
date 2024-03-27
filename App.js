import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Fav from "./screens/Fav";
import Profile from './screens/Profile'
import Search from "./screens/Search";
import Homepage from "./screens/Homepage";
import AuthProvider, { useAuth } from "./screens/AuthContext"
import TabNavigation from "./screens/navigations/TabNavgiation";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [user] = useAuth()

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Fav" component={Fav} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider> 
      <Navigator> 
      <TabNavigation/>
      </Navigator>
      
      </AuthProvider>
    </NavigationContainer>
  );
};



export default App;
