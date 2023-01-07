import { Row, Text, VStack } from "native-base";
import { SmileySad } from "phosphor-react-native";
import { View } from "react-native";

export function EmptyRankingList() {
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <VStack
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
        pt={2}
      >
        <Text color="white" fontSize="sm" textAlign="center" mb="5">
          Nenhum dos participantes pontuou!
        </Text>{" "}
        <View>
          <SmileySad color="#8D8D99" size={52}/>
        </View>
      </VStack>
    </Row>
  );
}
