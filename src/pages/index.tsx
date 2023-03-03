import { Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { Card } from "../components/Card";
import { useGameState } from "../hooks/useGameState";

export default function Home() {
  const {
    gameData,
    setGameData,
    setFlippedIndices,
    setMatchedCards,
    setMoves,
    initialize,
    replay,
  } = useGameState();
  const { cards, moves, gameOver, flippedIndices, matchedCards } = gameData;
  const completeBgs = [...Array(10)].map(
    (x, i) => `images/game_complete/card-${i + 1}-complete.svg`
  );
  const backBgs = [...Array(10)].map(
    (x, i) => `/images/phase1/game/card-${i + 1}.svg`
  );

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (gameData.matchedCards.length == 10) {
      setGameData({ ...gameData, gameOver: true });
    }
  }, [moves]);

  const updateActiveCards = (i: number) => {
    if (!flippedIndices.includes(i)) {
      if (flippedIndices.length === 1) {
        const firstId = cards[flippedIndices[0]].id;
        const secondId = cards[i].id;

        if (firstId === secondId) {
          setMatchedCards([...matchedCards, firstId, secondId]);
        }
        setFlippedIndices([...flippedIndices, i]);
      } else if (flippedIndices.length === 2) {
        setFlippedIndices([i]);
      } else {
        setFlippedIndices([i]);
      }

      setMoves(moves + 1);
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Grid className="container">
        <Grid pt={{ xl: "160px", xs: "100px" }} pb={4} p={2}>
          {gameOver && (
            <Grid ml={2} position={"absolute"} top={"60px"} right={"30px"}>
              <Button
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000",
                  width: "100px",
                }}
                onClick={() => replay()}
              >
                Replay
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid className="board" container ml={"auto"} mr={"auto"}>
          <Grid mb={2}>
            <Typography className={"main-title"} sx={{ wordBreak: "keep-all" }}>
              <b>Buy and Sell</b> premium, pre-loved fashion for little ones
            </Typography>
          </Grid>
          <Grid className="board" container ml={"auto"} mr={"auto"} gap={0.5}>
            {cards.map((data, i) => {
              const { id } = data;
              const flipped = flippedIndices.includes(i);
              const matched = matchedCards.includes(id);
              const completeBg = completeBgs[i];
              const backBg = backBgs[i];

              return (
                <Grid item lg={2.2} xs={2.2} key={i}>
                  <Card
                    {...{
                      flipped,
                      matched,
                      gameOver,
                      backBg,
                      completeBg,
                      data,
                      onClick: () => {
                        updateActiveCards(i);
                      },
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
