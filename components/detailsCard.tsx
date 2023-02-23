import { Pokemon } from "@/types";
import { CatchingPokemon, SettingsBackupRestore } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface DetailsCardProps {
  pokemon: Pokemon;
  isCatched: boolean;
  onCatch: (pokemon: Pokemon) => void;
  onRelease: (id: string) => void;
}

export function DetailsCard({
  pokemon,
  isCatched,
  onCatch,
  onRelease,
}: DetailsCardProps) {
  return (
    <Card sx={{ width: 345, padding: 4 }}>
      <CardMedia
        sx={{ height: 300, backgroundSize: "contain" }}
        image={pokemon.sprites.front_default}
        title={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {pokemon.height}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {pokemon.weight}
        </Typography>
      </CardContent>
      <CardActions>
        {isCatched ? (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SettingsBackupRestore fontSize="large" />}
            onClick={() => onRelease(pokemon.id)}
          >
            Release pokemon
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<CatchingPokemon fontSize="large" />}
            onClick={() => onCatch(pokemon)}
          >
            Catch pokemon
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
