import { useState } from "react";

export type CardData = {
  bgFront: string;
  bgBack: string;
  id: string;
};

// TODO : get this from the server;
const cards: CardData[] = [
  {
    bgFront: "/images/illustrations/card-1-turned.svg",
    bgBack: "/images/phase1/game/card-1.svg",
    id: "1",
  },
  {
    bgFront: "/images/illustrations/card-2-turned.svg",
    bgBack: "/images/phase1/game/card-2.svg",
    id: "2",
  },
  {
    bgFront: "/images/illustrations/card-3-turned.svg",
    bgBack: "/images/phase1/game/card-3.svg",
    id: "3",
  },
  {
    bgFront: "/images/illustrations/card-4-turned.svg",
    bgBack: "/images/phase1/game/card-4.svg",
    id: "4",
  },
  {
    bgFront: "/images/illustrations/card-6-turned.svg",
    bgBack: "/images/phase1/game/card-6.svg",
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

  const initialize = () => {
    setGameData({
      ...defaultGameState,
      cards: getShuffledArray([...cards, ...cards]),
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
