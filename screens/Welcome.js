import { SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {Text,Button} from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import COLORS from "./components/colors";
import { useFonts } from 'expo-font';



const Welcome = () => {
    const navigation = useNavigation();

    const handleRegister = () => {
        navigation.navigate("Register");
    };
    return( 
      
    <SafeAreaView>
     
        <View style={{padding:32}}>
            <View style={{flexDirection:"row", alignItems:"center", gap:12, marginBottom:21 }}>
                <View style={{ width:60, height:60, backgroundColor:COLORS.primary, borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:COLORS.white, fontWeight:"600", fontSize:28}}> GO </Text>
                </View>
                <Text style={{justifyContent:"center", fontSize: 24, fontWeight:"500"}}>Explore the City
                </Text>
                </View>

            <View style={{flexDirection:"column", alignItems:"flex-start", gap:14 }} >
            <Text style={{ fontSize: 40, fontWeight:"500"}}>Collect good memories</Text>
            <Text style={{ fontSize: 44, fontWeight:"700", color:COLORS.primary}}>by travelling</Text>
            
            <Text style={{ fontSize: 12, fontWeight:"400"}}>Explore the City is your guide to uncovering the hidden gems of your city. From local flavors to cultural events, find everything here. Ready to explore?  </Text>
            <TouchableOpacity onPress={handleRegister}
                    style={{
                        alignItems:"center",
                        justifyContent: "center",
                        height: 46}}>
                        <View style={{backgroundColor:COLORS.primary, padding:12, borderRadius:5}}>
                        <Text style={{fontSize:18, color:COLORS.white, fontWeight:"500"}}>Start the Journey</Text></View></TouchableOpacity>
            </View></View>
            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
            <View style={{ width: "40%", overflow: "hidden", position: "relative" }}>
            <View style={{ width: 340, height: 340, backgroundColor: COLORS.secondary, borderRadius: 200, alignSelf: "flex-end", marginRight: "20%" }}></View>
            </View> 
            <View style={{position: "absolute", top: "1%", zIndex: 1, alignItems:"center" }}>
                <Image source={require("./../assets/welcomeIllustration.png")} style={{ width: 400, height: 420 }} resizeMode="contain" />
            </View>
             <View>
                 <View style={{ width: 380, height: 380, backgroundColor: COLORS.primary, borderRadius: 200, alignSelf: "flex-end" }}></View>
            </View></View>

   </SafeAreaView>
    )
}


export default Welcome;