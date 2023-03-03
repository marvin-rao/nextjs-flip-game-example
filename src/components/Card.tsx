import { Grid } from "@mui/material";

export const Card = ({
  onClick,
  matched,
  flipped,
  gameOver,
  data,
  completeBg,
  backBg,
}: {
  flipped: boolean;
  matched: boolean;
  onClick: () => void;
  gameOver: boolean;
  completeBg: string;
  backBg: string;
  data: { bgFront: string };
}) => {
  const { bgFront } = data;
  return (
    <Grid
      onClick={onClick}
      className={`card ${flipped || matched ? "active" : ""} ${
        matched ? "matched" : ""
      } ${gameOver ? "gameover" : ""}`}
    >
      {!gameOver && (
        <img
          src={flipped ? bgFront : matched ? bgFront : backBg}
          className="card-back"
        />
      )}
      {gameOver && (
        <img
          src={completeBg}
          className="card"
          style={{ transform: "rotateY(180deg)" }}
        />
      )}
    </Grid>
  );
};
