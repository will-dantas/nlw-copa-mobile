import { Heading, HStack, Text, VStack } from "native-base";

interface UserCardProps {
  label: string;
  value: number;
}

export const UserCard = ({ label, value }: UserCardProps) => {
  return (
    <HStack
      w={90}
      h={20}
      bgColor="gray.800"
      borderLeftWidth={3}
      borderLeftColor="yellow.500"
      justifyContent="space-evenly"
      alignItems="center"
      rounded="sm"
      p={4}
    >
      <VStack
        justifyContent="space-between"
        alignItems="center"
        mr="auto"
        ml="auto"
      >
        <Heading color="white" fontSize="md" fontFamily="heading">
          {label}
        </Heading>

        <Text color="gray.200" fontSize="xl">
          {value}
        </Text>
      </VStack>
    </HStack>
  );
};
