import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async(nameOrId:string) => {

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    const { name, sprites, types, id, height, weight, abilities, stats } = data;

    // const newpokemon = { name, sprites, types, id, height, weight, abilities, stats };

    return { 
        name, 
        sprites, 
        types, 
        id, 
        height, 
        weight, 
        abilities, 
        stats 
    };

}
