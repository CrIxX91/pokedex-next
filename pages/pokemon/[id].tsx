import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { colorTypeGradients, hexToRGB } from "@/utils";
import { Button, Card, Container, Grid, Image, Spacer, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface Props{
    pokemon:Pokemon
}

const PokemonPage: NextPage<Props> = ({pokemon}) => {
    
    
    const {name,sprites,types,id,height,weight} = pokemon;
    let finalColor;
    console.log(pokemon);

    if (types.length === 2) {
        finalColor = colorTypeGradients(types[0].type.name, types[1].type.name, types.length);
    } else {
        finalColor = colorTypeGradients(types[0].type.name, types[0].type.name, types.length);
    }
    const cardbg = hexToRGB(finalColor[0],'0.43');

  return (
   <Layout title="Algun pokemon">

    <Grid.Container css={{marginTop:'5px'}} gap={2} justify='center' >
        <Grid xs={10}>
            <Card isHoverable css={{padding:'30px',background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`}} >
                <Card.Body css={{ display:'flex', flexDirection:'row'}}>
                    <Grid xs={4}>
                        <Card>
                            <Card.Body css={{backgroundColor:cardbg}}>
                                <Card.Header css={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                                    <div style={{maxHeight:'50px'}}>
                                        <Text h2 >#{String(id).padStart(3, '0')}</Text>
                                    </div>
                                    <Text h1 transform="capitalize">{name}</Text>
                                    <div className="info_container_data_type">
                                    {
                                        types.map((type)=>
                                            <div key={type.type.name} className={`poke_type_bg ${type.type.name}`}>
                                                <img src={`/icons/${type.type.name}.svg`} alt="poke-type"></img>
                                            </div>
                                        )
                                    }
                                    </div>
                                </Card.Header>
                            
                                <Card.Image 
                                    src={sprites.other?.dream_world.front_default || '/no-image.png'}
                                    alt={name}
                                    width='100%'
                                    height={200}
                                />
                                <div className="dimensions">
                                    <p ><span className="info__container__headings" style={{ fontSize: "20px" }}>Height: </span> {`${height / 10} m/${`${Math.floor(height / 10 * 3.28)}'${Math.round(((height / 10 * 3.28) % 1) * 12)}"`} `} </p>
                                    <p ><span className="info__container__headings" style={{ fontSize: "20px" }}>Weight: </span>{` ${(weight / 10).toFixed(1)} kg/${(weight * 0.2205).toFixed(1)} lbs`}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid xs={12}>
                        <Card css={{background:'red'}} >

                        </Card>

                    </Grid>
                    
                </Card.Body>
            </Card>
        </Grid>
        <Grid>

        </Grid>

        {/* <Grid xs={8} sm={8}>
            
            <Card css={{}}>
                <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
                    <Text h1 transform="capitalize">{name}</Text>
                    <Button 
                        color={"gradient"} 
                        ghost
                    >
                        Guardar en Favoritos
                        
                    </Button>
                </Card.Header>

                <Card.Body>
                    <Text size={30}>Sprites</Text>

                    <Container direction="row" display="flex" gap={0}>
                        <Image 
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                        />
                         <Image 
                            src={pokemon.sprites.back_default}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                        />
                         <Image 
                            src={pokemon.sprites.front_shiny}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                        />
                         <Image 
                            src={pokemon.sprites.back_shiny}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                        />
                    </Container>
                </Card.Body>
            </Card>
        </Grid> */}

    </Grid.Container>
   </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map((values,i)=>`${i+1}`);

    return {
        paths: pokemon151.map(id=>({
            params:{id}
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { id } = params as {id:string};

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);


    return {
        props: {
            pokemon:data
        }
    }
}

export default PokemonPage