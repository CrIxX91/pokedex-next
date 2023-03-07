import { FC } from "react";
import { Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from "./";

interface FavoritePokemonsProps {
    pokemons:number[]
}

export const FavoritePokemons:FC<FavoritePokemonsProps> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction='row' justify="flex-start">
        {
            pokemons.sort((a,b)=>{return a-b}).map(id=>(
                <FavoriteCardPokemon id={id} key={id}/>
            ))
        }
    </Grid.Container>
  )
}