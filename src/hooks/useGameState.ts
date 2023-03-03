import { useEffect, useState } from "react";

export type CardData = {
  bgFront: string;
  id: string;
};

// TODO : get this from the server;
const cards: CardData[] = [
  {
    bgFront: "/images/illustrations/card-1-turned.svg",
    id: "1",
  },
  {
    bgFront: "/images/illustrations/card-2-turned.svg",
    id: "2",
  },
  {
    bgFront: "/images/illustrations/card-3-turned.svg",
    id: "3",
  },
  {
    bgFront: "/images/illustrations/card-4-turned.svg",
    id: "4",
  },
  {
    bgFront: "/images/illustrations/card-6-turned.svg",
    id: "6",
  },
];

type GameState = {
  cards: CardData[];
  matchedCards: string[];
  moves: number;
  gameOver: boolean;
  flippedIndices: number[];
};

// TODO : Retrieve from local storage;
export const defaultGameState: GameState = {
  matchedCards: [],
  cards,
  moves: 0,
  gameOver: false,
  flippedIndices: [],
};

const getShuffledArray = (arr: any[]) => {
  return arr
    .map((value) => {
      return { value, sort: Math.random() };
    })
    .sort((a, b) => {
      return a.sort - b.sort;
    })
    .map(({ value }) => value);
};

export const useGameState = () => {
  // TODO : Use React Query to fetch data from game.js

  const [gameData, setGameData] = useState<GameState>(defaultGameState);

  const initialize = () => {
    if (typeof window !== "undefined") {
      const cache = localStorage.getItem("CachedGame");
      if (cache) {
        setGameData({ ...JSON.parse(cache), cards: [...cards, ...cards] });
        return;
      }
    }
    setGameData({
      ...defaultGameState,
      cards: getShuffledArray([...cards, ...cards]),
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Set Game to local storage");
      setTimeout(() => {
        localStorage.setItem("CachedGame", JSON.stringify(gameData));
      }, 2000);
    }
  }, [gameData]);

  const setFlippedIndices = (flippedIndices: GameState["flippedIndices"]) => {
    setGameData((prev) => {
      return { ...prev, flippedIndices };
    });
  };

  const setMatchedCards = (matchedCards: GameState["matchedCards"]) => {
    setGameData((prev) => {
      return { ...prev, matchedCards };
    });
  };

  const setMoves = (moves: GameState["moves"]) => {
    setGameData((prev) => {
      return { ...prev, moves };
    });
  };

  return {
    cards,
    gameData,
    setFlippedIndices,
    setMatchedCards,
    setGameData,
    setMoves,
    initialize,
  };
};
