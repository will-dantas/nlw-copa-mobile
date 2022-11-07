import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from "./src/styles/styles";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import SigIn from "./src/screens/Signin";
import { AuthContextProvider } from "./src/contexts/Auth/AuthContext";
import { Pools } from "./src/screens/Pools";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Pools /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
