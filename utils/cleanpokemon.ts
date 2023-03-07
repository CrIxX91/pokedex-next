import { Pokemon } from "@/interfaces";

export const cleanpokemon = (pokemonfull:Pokemon) => {
    const { name, sprites, types, id, height, weight, abilities, stats } = pokemonfull;
    const newpokemon = { name, sprites, types, id, height, weight, abilities, stats };
    return newpokemon
}
