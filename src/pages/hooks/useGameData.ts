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

export const useGameData = () => {
  // TODO : Use React Query to fetch data from game.js

  const [gameData, setGameDate] = useState<{ cards: CardData[] }>({
    // TODO : Retrieve from local storage;
    cards: cards,
  });

  const setBoardData = (boardData: CardData[]) => {
    // TODO : Cache to local storage;
    setGameDate({ cards: boardData });
  };

  return {
    cards,
    gameData,
    setBoardData,
  };
};
