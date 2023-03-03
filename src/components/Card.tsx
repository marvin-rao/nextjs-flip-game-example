import { Grid } from "@mui/material";

export const Card = ({
  onClick,
  matched,
  flipped,
  gameOver,
  data,
}: {
  flipped: boolean;
  matched: boolean;
  onClick: () => void;
  gameOver: boolean;
  data: { bgBack: string; bgFront: string };
}) => {
  const { bgBack, bgFront } = data;
  const bg = flipped ? bgFront : matched ? bgFront : bgBack;
  return (
    <Grid
      onClick={onClick}
      className={`card ${flipped || matched ? "active" : ""} ${
        matched ? "matched" : ""
      } ${gameOver ? "gameover" : ""}`}
    >
      <div
        className="card-back"
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </Grid>
  );
};
