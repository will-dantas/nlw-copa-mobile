import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Avatar, Heading, HStack, Text, VStack } from "native-base";

export interface RankingPros {
  id: string;
  idRanking: number;
  idGame: string;
  guessHome: number;
  guessAlway: number;
  participantsId: string;
  userAvatar: string;
  userName: string;
  score: number;
}

export interface ParticipantProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

interface Props extends TouchableOpacityProps {
  data: RankingPros;
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 20,
    border: "1px solid #F7DD43",
    justifyContent: "center",
    alignItems: "center",
  },
});

export function RankingCard({ data, ...rest }: Props) {
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
          <Avatar
            source={{ uri: data.userAvatar }}
            w="45"
            h="45"
            rounded="full"
            zIndex={999}
            pb={-20}
          >
            {data.userName}
          </Avatar>

          <VStack pl="2">
            <Heading color="white" fontSize="md" fontFamily="heading">
              {data.userName}
            </Heading>

            <Text color="gray.200" fontSize="xs">
              {data.score} pontos
            </Text>
          </VStack>
        </HStack>
        <View style={styles.container}>
          <Text color="yellow.500" fontSize="md" fontWeight="bold">
            {data.idRanking + 1}º
          </Text>
        </View>
      </HStack>
    </TouchableOpacity>
  );
}
