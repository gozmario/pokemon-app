import { getPokemonsByType, getPokemonTypes } from "@/service";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { usePokemonStore, useSelectionStore } from "@/store";
import { isPokemonCatched } from "@/utils";
import { MappedPokemon } from "@/types";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["pokemon-types"], getPokemonTypes);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const router = useRouter();
  const { pokemons: catchedPokemons } = usePokemonStore();
  const {
    selectedName,
    selectedType,
    showOnlyCatched,
    handleNameChange,
    handleTypeChange,
    handleOnlyCatchedChange,
  } = useSelectionStore();

  const { data: types } = useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
    staleTime: Infinity,
  });

  const { data: selectedPokemons, isFetching } = useQuery({
    initialData: [],
    queryKey: ["selected-pokemons", selectedType],
    queryFn: () => getPokemonsByType(selectedType),
    enabled: !!selectedType,
  });

  const mappedPokemons: MappedPokemon[] = useMemo(() => {
    return selectedPokemons.map((pokemon) => ({
      isCatched: isPokemonCatched(catchedPokemons, pokemon.id),
      ...pokemon,
    }));
  }, [selectedPokemons, catchedPokemons]);

  const filteredPokemons = useMemo(() => {
    return mappedPokemons.filter((pokemon) => {
      const conditions = [
        pokemon.name
          .toLowerCase()
          .includes(selectedName ? selectedName.toLowerCase() : ""),
        showOnlyCatched ? pokemon.isCatched : true,
      ];
      return conditions.every((i) => i);
    });
  }, [mappedPokemons, selectedName, showOnlyCatched]);

  function handlePokemonSelect(id: string) {
    router.push(`/details/${id}`);
  }

  return (
    <Container>
      <Paper
        sx={{
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(5px)",
        }}
        elevation={4}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Select pokemon
        </Typography>
        <Stack spacing={2} sx={{ my: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <FormControl fullWidth>
                <InputLabel id="pokemon-type-label">Pokemon Type</InputLabel>
                <Select
                  labelId="pokemon-type-label"
                  id="pokemon-type"
                  label="Pokemon Type"
                  value={selectedType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  {types?.map((type, idx) => (
                    <MenuItem key={idx} value={type.name}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showOnlyCatched}
                      onChange={(_, checked) =>
                        handleOnlyCatchedChange(checked)
                      }
                    />
                  }
                  label="Show only catched pokemons"
                />
              </FormControl>
            </Grid>
          </Grid>
          <InputLabel id="pokemon-name-autocomplete">Pokemon Name</InputLabel>
          <Autocomplete
            id="pokemon-name-autocomplete"
            disabled={!selectedPokemons.length}
            options={selectedPokemons.map((pokemon) => pokemon.name)}
            onChange={(e, newValue) => handleNameChange(newValue)}
            value={selectedName}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Start type a name but select a type first..."
              />
            )}
          />
        </Stack>
        <Box sx={{ height: 400, overflow: "auto" }}>
          {isFetching ? (
            <CircularProgress />
          ) : (
            filteredPokemons.map((pokemon, idx) => (
              <Button
                key={`pokemon-${idx}`}
                variant="contained"
                color={pokemon.isCatched ? "success" : "primary"}
                onClick={() => handlePokemonSelect(pokemon.id)}
                sx={{ mr: 1, mb: 1 }}
              >
                {pokemon.name}
              </Button>
            ))
          )}
          {filteredPokemons.length === 0 && (
            <Typography>No pokemon found</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
