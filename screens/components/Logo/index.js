import React from "react";
import {Image} from "react-native";

const Logo = () => {
  return(
    <Image
     source={require("./../../../assets/Logo.png")}
      style={{
        width: 72,
        height: 72,
        margin: "0 auto",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    />
  );
};



export default Logo;