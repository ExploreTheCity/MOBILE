import { Text, Pressable } from "react-native";
import COLORS from "./colors";
import { StyleSheet } from "react-native";



const Button = (props) => {

    const FilledBgColor = props.color || COLORS.white;
    const outlinedColor = COLORS.primary;
    const bgColor = props.filled ? FilledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return(
        <Pressable
            style={{
                ...styles.button,
                ...{backgroundColor : bgColor},
                ...props.style

            }}
            onPress={props.onPress}
            >
                <Text style = {{ fontSize: 18, ... {color: textColor} }}>{props.title} </Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button:{
        paddingBottom: 24,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        borderWidth: 3,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    }
})



export default Button;