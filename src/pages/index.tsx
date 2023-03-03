import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { useGameData } from "./hooks/useGameData";

export default function Home() {
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { setBoardData, gameData } = useGameData();
  const { cards } = gameData;

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (matchedCards.length == 10) {
      setGameOver(true);
    }
  }, [moves]);

  const initialize = () => {
    shuffle();
    setGameOver(false);
    setFlippedIndices([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const shuffle = () => {
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);
    setBoardData(shuffledCards);
  };

  const updateActiveCards = (i: number) => {
    if (!flippedIndices.includes(i)) {
      if (flippedIndices.length === 1) {
        const firstId = cards[flippedIndices[0]].id;
        const secondId = cards[i].id;

        if (firstId === secondId) {
          setMatchedCards((prev) => [...prev, firstId, secondId]);
        }
        setFlippedIndices([...flippedIndices, i]);
      } else if (flippedIndices.length === 2) {
        setFlippedIndices([i]);
      } else {
        setFlippedIndices([...flippedIndices, i]);
      }

      setMoves((v) => v + 1);
    }
  };

  return (
    <Grid className="container" pt={8} pl={8}>
      <Grid className="board" container gap={1}>
        {cards.map((data, i) => {
          const { id } = data;
          const flipped = flippedIndices.includes(i);
          const matched = matchedCards.includes(id);
          console.log("matched", matched);
          return (
            <Grid item lg={2} xs={2} key={i}>
              <Card
                {...{
                  flipped,
                  matched,
                  gameOver,
                  data,
                  onClick: () => {
                    updateActiveCards(i);
                  },
                }}
              />
            </Grid>
          );
        })}

        <Grid className="menu" paddingX={8} container>
          <p>{`GameOver - ${gameOver}`}</p>
          <Grid flex={1} />
          <Grid className="menu">
            <p>{`Moves - ${moves}`}</p>
          </Grid>
          <Grid ml={2}>
            <Button
              style={{
                backgroundColor: "#23B4B6",
                color: "#fff",
                width: "100px",
              }}
              onClick={() => initialize()}
              className="reset-btn"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
