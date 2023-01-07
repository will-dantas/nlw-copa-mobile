import { useCallback, useState } from "react";
import { VStack, useToast, HStack, Text, Avatar, FlatList } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { UserCard } from "../../components/UserCard";
import { PoolCardUser } from "../../components/PoolCardUser";
import { EmptyPoolUserList } from "../../components/EmptyPoolUserList";
import { IOwnPools, IUser } from "./User.interface";

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

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="PERFIL" />
      <HStack
        w="full"
        h={70}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="center"
        alignItems="center"
        mb={3}
        pt={60}
      >
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
      </HStack>

      <HStack
        w="full"
        h={10}
        justifyContent="center"
        alignItems="center"
        pt={12}
      >
        <Text color="yellow.500" fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
      </HStack>

      <HStack
        w="full"
        justifyContent="space-evenly"
        alignItems="center"
        pt={10}
      >
        <UserCard label="Bolões" value={userData.participatingAt} />
        <UserCard label="Dono" value={userData.ownPools} />
      </HStack>

      <HStack
        w="full"
        h={10}
        justifyContent="center"
        alignItems="center"
        pt={12}
      >
        <Text
          color="yellow.500"
          fontSize="md"
          pt={3}
          pb={3}
          justifyContent="start"
        >
          Bolões que você criou
        </Text>
      </HStack>

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
        mb={10}
      />
    </VStack>
  );
}
