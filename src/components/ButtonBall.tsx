import { View } from "native-base";
import { SoccerBall } from "phosphor-react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#047C3F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
});

interface ButtonBallProps {
    size: number;
    color: string;
}

const ButtonBall = ({ size, color }: ButtonBallProps) => {
  return (
    <View style={styles.container}>
      <SoccerBall color={color} size={size} />
    </View>
  );
};

export default ButtonBall;
