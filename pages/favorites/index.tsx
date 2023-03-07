import { Layout } from "@/components/layouts";
import { Nofavorites } from "@/components/ui";
import { useEffect, useState } from "react";
import { localFavorites } from "@/utils";
import { FavoritePokemons } from "@/components/pokemon";


const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.favpokemons);
  }, [])
  

  return (
    <Layout title="favorites">
      {
        favoritePokemons.length === 0 ?(<Nofavorites/>) 
        :(
          <FavoritePokemons pokemons={favoritePokemons}/>
        )
      }
    </Layout>
  )
}

export default FavoritesPage