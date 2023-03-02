import { Button, Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Board } from "../components/Board";
import { Card } from "../components/Card";
import styles from "../styles/Home.module.css";

const board = [
  {
    bgFront: "/images/illustrations/card-1-turned.svg",
    bgBack: "/images/phase1/game/card-1.svg",
  },
  {
    bgFront: "/images/illustrations/card-2-turned.svg",
    bgBack: "/images/phase1/game/card-2.svg",
  },
  {
    bgFront: "/images/illustrations/card-3-turned.svg",
    bgBack: "/images/phase1/game/card-3.svg",
  },
  {
    bgFront: "/images/illustrations/card-4-turned.svg",
    bgBack: "/images/phase1/game/card-4.svg",
  },
  {
    bgFront: "/images/illustrations/card-5-turned.svg",
    bgBack: "/images/phase1/game/card-5.svg",
  },
  {
    bgFront: "/images/illustrations/card-6-turned.svg",
    bgBack: "/images/phase1/game/card-6.svg",
  },
  {
    bgFront: "/images/illustrations/card-7-turned.svg",
    bgBack: "/images/phase1/game/card-7.svg",
  },
  {
    bgFront: "/images/illustrations/card-8-turned.svg",
    bgBack: "/images/phase1/game/card-8.svg",
  },
  {
    bgFront: "/images/illustrations/card-9-turned.svg",
    bgBack: "/images/phase1/game/card-9.svg",
  },
  {
    bgFront: "/images/illustrations/card-10-turned.svg",
    bgBack: "/images/phase1/game/card-10.svg",
  },
];

export default function Home() {
  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
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
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const shuffle = () => {
    setBoardData(board);
  };

  const updateActiveCards = (i) => {
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }

      setMoves((v) => v + 1);
    }
  };

  return (
    <Grid className="container" pt={8} pl={8}>
      <Grid className="board" container gap={2}>
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
            <Grid lg={2} xs={2}>
              <Card
                key={i}
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
