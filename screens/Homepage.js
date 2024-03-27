import { useNavigation } from "@react-navigation/native";
import {SafeAreaView,SafeAreaProvider,SafeAreaInsetsContext,useSafeAreaInsets,} from 'react-native-safe-area-context';
import { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import COLORS from "./components/colors";
import MenuContainer from "./components/MenuContainer";
import Header from "./components/Header";
import Ionicons from '@expo/vector-icons/Ionicons';


const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false,
    });
  },[])


  return (
    <SafeAreaView>
      <View style={{margin:6}}>
        <Header/>
      </View>

      <View style={{ gap:36, alignItems: "center", justifyContent: "center"}}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry"}}
          placeholder="Explore"
          fetchDetails={true}
          onPress={(data, details=null)=> {
            console.log(data,details);
          }}
          query={{
            key:"AIzaSyC-PZ-1tHmw9-s2iJeL68HQ5wsA1JVKTUo",
            language: "en",
          }}
          styles={{
            container: {
              flex: 1,
              width: "100%",
              padding:16,
              marginTop:12,
              opacity:0.8,
          }}}
        />
        <MenuContainer />
      </View>

      <View style={{ alignItems: "stretch", justifyContent: "center", padding: 16 }}>
  <Text style={{ fontSize: 24,  fontWeight: 600 }}>Top Tips</Text>
  <TouchableOpacity style={{ flexDirection: "row", marginVertical: 4, alignItems: "center" }}>
    <Text style={{fontSize: 16, paddingHorizontal: 4 }}>Explore more</Text>
    <Ionicons name="arrow-forward-circle-outline" color={COLORS.black} size={18} />
  </TouchableOpacity>
</View>

  </SafeAreaView>
  );
};

export default Homepage;