import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';




interface FavoriteCardPokemonProps{
    id:number
}

export const FavoriteCardPokemon:FC<FavoriteCardPokemonProps> = ({id}) => {

    const router = useRouter();

    const onPokemonClick = ( ) => {
        router.push(`/pokemon/${id}`);
    }
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id} >
        <Card isHoverable isPressable css={{padding:10}} onClick={onPokemonClick}>
            <Card.Image 
                // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ id }.svg`} 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ id }.png`} 
                width={'100%'}
                height={140} 
            />
        </Card> 
    </Grid>
    
  )
}
