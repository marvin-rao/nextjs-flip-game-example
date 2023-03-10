import { Card, Grid } from "@mui/material";
import { useState, useEffect } from "react";
const board = ["🤖", "👽", "👻", "🤡", "🐧"];

export function Board() {
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
    const shuffledCards = [...board, ...board]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
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
    <Grid className="container">
      <Grid className="menu">
        <p>{`Moves - ${moves}`}</p>
      </Grid>

      <Grid container>
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
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
          );
        })}
      </Grid>
      <Grid className="menu">
        <p>{`GameOver - ${gameOver}`}</p>
        <button onClick={() => initialize()} className="reset-btn">
          Reset
        </button>
      </Grid>
    </Grid>
  );
}
