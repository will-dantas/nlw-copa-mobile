import { Center, HStack, Icon, Text, View, VStack } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import capa from "../../assets/capa.png";
import { BlurView } from "expo-blur";

export function SignIn() {
  const { singIn, isUserLoading } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: "auto",
      height: "auto",
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
    },
  });

  const stylesBlur = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      padding: 25
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={capa as any}
        resizeMode="cover"
        style={styles.image}
      >
        <VStack
          justifyContent="center"
          alignItems="center"
          ml="10"
          mr="10"
        ></VStack>
        <BlurView intensity={10} style={stylesBlur.container}>
          <VStack
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
          >
            <Image source={logo as any} style={{ width: 320, height: 60 }} />
            <Button
              borderRadius="30px"
              type="SECONDARY"
              title="ENTRAR COM O GOOGLE"
              mt="380px"
              leftIcon={
                <Icon as={Fontisto} name="google" color="white" size="md" />
              }
              onPress={singIn}
              isLoading={isUserLoading}
              _loading={{ _spinner: { color: "white" } }}
            />
            <Text color="white" textAlign="center" mt={4}>
              Não utilizamos nenhuma informação além {"\n"}
              do seu e-mail para criação da sua conta
            </Text>
          </VStack>
        </BlurView>
      </ImageBackground>
    </View>
  );
}
