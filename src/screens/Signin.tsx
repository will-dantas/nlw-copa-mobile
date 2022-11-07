import { Center, Icon, Text, View } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { Image } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function SigIn() {
  const { signIn } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Image source={logo as any} style={{ width:212, height:40 }} />
      <Button
        type="SECONDARY"
        title="ENTRAR COM O GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação da sua conta
      </Text>
    </Center>
  );
}
