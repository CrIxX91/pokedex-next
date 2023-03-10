import { GetStaticProps, NextPage } from 'next';
import { Grid } from '@nextui-org/react';


import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonCard } from '@/components/pokemon';



interface Props{
  pokemons:SmallPokemon[]
}

const HomePage:NextPage<Props> = ({pokemons}) => {
    
  return (
   <Layout >
    <Grid.Container gap={2} justify='flex-start'  >
      {
          pokemons.map((pkm)=>(
              <PokemonCard pokemon={pkm} key={pkm.id}/>
            )) 
      }
    </Grid.Container>
   </Layout>
  )
}

export const getStaticProps:GetStaticProps =async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons:SmallPokemon[] = data.results.map((poke,i)=>({
    ...poke,
    id:i+1,
    image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ i+1 }.png` 

    // image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i+1 }.svg`
  }))

  return{
    props:{
      pokemons
    }
  }
}


export default HomePage;
