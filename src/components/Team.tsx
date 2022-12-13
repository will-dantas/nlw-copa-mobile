import { Box, HStack, Text } from "native-base";
import CountryFlag from "react-native-country-flag";
import { GameProps } from "./Game";

import { Input } from "./Input";

interface Props {
  code: string;
  position: "left" | "right";
  onChangeText: (value: string) => void;
  data: GameProps;
  homeTeam: boolean;
}

export function Team({ code, position, onChangeText, data, homeTeam }: Props) {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      {position === "left" && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      {data.guess ? (
        <Box pl={4} pr={4}>
          <Text color="white" fontSize={16} fontFamily="heading">
            {homeTeam
              ? data.guess.firstTeamPoints
              : data.guess.secondTeamPoints}
          </Text>
        </Box>
      ) : (
        <Input
          w={10}
          h={9}
          textAlign="center"
          fontSize="xs"
          keyboardType="numeric"
          onChangeText={onChangeText}
        />
      )}

      {position === "right" && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
