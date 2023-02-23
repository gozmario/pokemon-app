import { DetailsCard } from "@/components";
import { getPokemonById } from "@/service";
import { usePokemonStore } from "@/store";
import { generateQueryKey, isPokemonCatched } from "@/utils";
import { ArrowBack } from "@mui/icons-material";
import { IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function DetailsPage() {
  const router = useRouter();
  const pokemonId: string =
    typeof router.query?.id === "string" ? router.query.id : "";
  const { data: pokemon, isLoading } = useQuery(
    [generateQueryKey("pokemon-details", pokemonId), pokemonId],
    () => getPokemonById(pokemonId),
    {
      enabled: !!pokemonId,
      staleTime: Infinity,
    }
  );

  const { pokemons, catchPokemon, releasePokemon } = usePokemonStore();

  const isCatched = useMemo(() => {
    return isPokemonCatched(pokemons, pokemonId);
  }, [pokemons, pokemonId]);

  return (
    <Paper
      sx={{
        p: 4,
        minWidth: 600,
        minHeight: 600,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={() => router.push("/", undefined, { shallow: true })}
          >
            <ArrowBack fontSize="large" />
          </IconButton>
          <Typography variant="h4">Pokemon details</Typography>
        </Stack>

        {isLoading && (
          <Skeleton variant="rectangular" width={345} height={465} />
        )}
        {!isLoading && pokemon && (
          <DetailsCard
            pokemon={pokemon}
            isCatched={isCatched}
            onCatch={catchPokemon}
            onRelease={releasePokemon}
          />
        )}
      </Stack>
    </Paper>
  );
}
