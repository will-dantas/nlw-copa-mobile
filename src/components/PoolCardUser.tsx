import { Heading, HStack, Text, VStack } from "native-base";
import { CaretRight, SoccerBall } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { StyleSheet } from "react-native";

interface CountParticipants {
  participants: number;
}

interface IOwnPools {
  id: string;
  title: string;
  _count: CountParticipants;
}

interface Props extends TouchableOpacityProps {
  data: IOwnPools;
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: "#F7DD43",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const PoolCardUser = ({ data, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={5}
      >
        <HStack justifyContent="start" alignItems="center">
          <View style={styles.container}>
            <SoccerBall color="#121214" size={25} />
          </View>
          <VStack ml={2}>
            <Heading color="white" fontSize="md" fontFamily="heading">
              {data.title}
            </Heading>

            <Text color="gray.200" fontSize="xs">
              {data._count.participants}{" "}
              {data._count.participants > 1 ? "participantes" : "participate"}
            </Text>
          </VStack>
        </HStack>

        <View>
          <CaretRight color="#F7DD43" size={25} />
        </View>
      </HStack>
    </TouchableOpacity>
  );
};
