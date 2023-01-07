import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import { getName } from "country-list";

import { Team } from "./Team";
import dayjs from "dayjs";
import prBR from "dayjs/locale/pt-br";
import { useEffect, useState } from "react";

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  date: string;
  guess: null | GuessProps;
  golHome?: string;
  golAway?: string
}

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
}: Props) {
  const { colors, sizes } = useTheme();
  const when = dayjs(data.date)
    .locale(prBR)
    .format("DD [de] MMMM [de] YYYY [às] HH:00[h]");
  const [gameDate, setGameDate] = useState(false);

  const expirationDate = () => {
    if (new Date(data.date) > new Date()) {
      setGameDate(true);
    }
  };

  useEffect(() => {
    expirationDate();
  }, [gameDate]);

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs.{" "}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          data={data}
          homeTeam={true}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          data={data}
          homeTeam={false}
        />
      </HStack>

      {gameDate === true ? (
        <Button
          size="xs"
          w="full"
          bgColor={data.guess !== null ? 'gray.300' : 'green.500'}
          mt={4}
          onPress={onGuessConfirm}
          disabled={!gameDate || data.guess !== null}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              {data.guess !== null ? 'PALPITE REALIZADO' : 'CONFIRMAR PALPITE'}
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      ) : (
        <Text color="red.500" fontSize={16} fontFamily="heading" mt={4}>
          Jogo já aconteceu!
        </Text>
      )}
    </VStack>
  );
}
