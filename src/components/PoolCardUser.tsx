import { Heading, HStack, Text, VStack } from "native-base";
import { UsersThree } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

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
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.title}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            {data._count.participants}{" "}
            {data._count.participants > 1 ? "participantes" : "participate"}
          </Text>
        </VStack>

        <View>
          <UsersThree color="#BBA317" size={25} />
        </View>
      </HStack>
    </TouchableOpacity>
  );
};
