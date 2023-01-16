import { useCallback, useState } from "react";
import {
  VStack,
  useToast,
  HStack,
  Text,
  Avatar,
  FlatList,
  Heading,
} from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { UserCard } from "../../components/UserCard";
import { PoolCardUser } from "../../components/PoolCardUser";
import { EmptyPoolUserList } from "../../components/EmptyPoolUserList";
import { IOwnPools, IUser } from "./User.interface";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [pool, setPool] = useState<IOwnPools[]>([]);
  const [userData, setUserData] = useState({
    participatingAt: 0,
    ownPools: 0,
  });
  const { navigate } = useNavigation();
  const toast = useToast();
  const { user } = useAuth();

  async function fetchUser() {
    try {
      setIsLoading(true);

      const response = await api.get<IUser>(`/users/${user.sub}`);
      const participatingSize = response.data.user.participatingAt.length;
      const ownPoolsSize = response.data.user.ownPools.length;

      setUserData({
        participatingAt: participatingSize,
        ownPools: ownPoolsSize,
      });

      setPool(response.data.user.ownPools);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar os dados do usuário",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const stylesBlur = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 20,
      borderRadius: 20,
      padding: 20,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  });

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="PERFIL" />
      <VStack
        w="auto"
        h={210}
        bgColor="yellow.500"
        borderWidth={0}
        borderRadius={20}
        ml={5}
        mr={5}
        mt={5}
        p={5}
      >
        <HStack justifyContent="start" alignItems="center">
          <Avatar
            source={{ uri: user.avatarUrl }}
            w={20}
            h={20}
            rounded="full"
            borderWidth={2}
            borderColor="yellow.500"
            zIndex={999}
            pb={-20}
          >
            {user?.name}
          </Avatar>

          <VStack pl="2">
            <Heading color="gray.900" fontSize="2xl" fontFamily="heading">
              {user.name}
            </Heading>

            <Text color="gray.900" fontSize="xs">
              {user.email}
            </Text>
          </VStack>
        </HStack>
        <HStack w="full" pt={1} justifyContent="center">
          <UserCard label="Bolões" value={userData.participatingAt} />
          <UserCard label="Dono" value={userData.ownPools} />
        </HStack>
      </VStack>
      <BlurView intensity={10} style={stylesBlur.container}>
        <Text color="yellow.500" fontSize="md">
          Bolões que você criou
        </Text>
      </BlurView>

      <FlatList
        data={pool}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PoolCardUser
            data={item}
            onPress={() => navigate("details", { id: item.id })}
          />
        )}
        ListEmptyComponent={<EmptyPoolUserList />}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ pb: 10 }}
        px={5}
        mt={5}
        mb={16}
      />
    </VStack>
  );
}
