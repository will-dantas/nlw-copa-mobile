import { FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { EmptyPoolList } from "../../components/EmptyPoolList";
import { GameProps } from "../../components/Game";
import { Loading } from "../../components/Loading";
import { PoolPros } from "../../components/PoolCard";
import { RankingCard } from "../../components/RankingCard";
import { api } from "../../services/api";
import { IGuesses } from "./ranking.interface";

interface Props {
  poolId: string;
  poolsData: PoolPros;
}

export interface Ranking {
  id: string;
  idGame: string;
  guessHome: number;
  guessAlway: number;
  participantsId: string;
  userAvatar: string;
  userName: string;
  score: number;
}

export const Ranking = ({ poolId }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [guesses, setGuesses] = useState<IGuesses[]>([]);
  const [games, setGames] = useState<GameProps[]>([]);
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      const resultGuesses = await api.get(`/pools/${poolId}/guesses`);
      setGuesses(resultGuesses.data);
      setGames(response.data.games);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar o ranking",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const golsPoll = games.map((game) => {
    return {
      idGame: game.id,
      golHome: game.golHome,
      golAlway: game.golAway,
    };
  });

  const guessPoll = guesses.map((guess) => {
    return {
      id: guess.id,
      idGame: guess.gameId,
      guessHome: guess.firstTeamPoints,
      guessAlway: guess.secondTeamPoints,
      participantsId: guess.participantId,
      userAvatar: guess.participant.user.avatarUrl,
      userName: guess.participant.user.name,
    };
  });

  const correctsGuesses = guessPoll.filter((guess) => {
    return golsPoll.some((gols) => {
      return (
        guess.idGame.toString() === gols.idGame.toString() &&
        guess.guessHome?.toString() === gols.golHome?.toString() &&
        guess.guessAlway?.toString() === gols.golAlway?.toString()
      );
    });
  });

  const guessScores = correctsGuesses.map((obj) => ({
    ...obj,
    score: correctsGuesses.filter((element) => {
      return element.participantsId === obj.participantsId;
    }).length,
  }));

  const correctsGuessesUnique: Ranking[] = guessScores.filter(
    (obj, index) =>
      guessScores.findIndex(
        (item) => item.participantsId === obj.participantsId
      ) === index
  );

  const sortcorrectsGuessesUnique = (
    actual: Ranking,
    other: Ranking
  ): number => actual.score - other.score;

  const mapToSortcorrectsGuessesUnique = correctsGuessesUnique
    .map((invoiceResponse) => invoiceResponse)
    .sort(sortcorrectsGuessesUnique)
    .reverse();

    const addKyes = mapToSortcorrectsGuessesUnique.map((obj, index) => ({
      ...obj,
      idRanking: index,
    }));

  console.log(mapToSortcorrectsGuessesUnique);

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={addKyes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RankingCard data={item} />}
      ListEmptyComponent={<EmptyPoolList />}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{ pb: 10 }}
    />
  );
};
