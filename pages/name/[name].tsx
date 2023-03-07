import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { pokeApi } from '@/api';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { Layout } from '@/components/layouts';
import { Button,Card,Container,Grid,Image,Text } from "@nextui-org/react";
import { localFavorites, colorTypeGradients, hexToRGB, cleanpokemon, getPokemonInfo } from '@/utils';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';

interface Props {
    pokemon: Pokemon;
}

const PokemonPageName:NextPage<Props>= ({pokemon}) => {
    const { name, sprites, types, id, height, weight, abilities, stats } = pokemon;
    let finalColor;
  
    // const [isFavorite, setIsFavorite] = useState(false);
    const [favorite, setFavorite] = useState(false);
    // console.log(isFavorite);
  
    useEffect(() => {
      setFavorite(localFavorites.existFavorites(id));
      console.log(favorite);
      
    }, [])
  
  
    const onToggleFavorites = () => {
      setFavorite(!favorite);
      localFavorites.toggleFavorite(id);
  
      if(favorite) return;
  
      confetti({
          zIndex:999,
          particleCount:100,
          spread:160,
          angle:-100,
          origin:{
              x:1,
              y:0
          }
      })
    }
    
    if (types.length === 2) {
      finalColor = colorTypeGradients(
        types[0].type.name,
        types[1].type.name,
        types.length
      );
    } else {
      finalColor = colorTypeGradients(
        types[0].type.name,
        types[0].type.name,
        types.length
      );
    }
    const cardbg = hexToRGB(finalColor[0], "0.43");
  
    return (
      <Layout title={pokemon.name}>
        <Grid.Container css={{ marginTop: "5px" }} gap={2} justify="center">
          <Grid xs={10}>
            <Card css={{padding: "30px",background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`}}>
              <Card.Body css={{ display: "flex", flexDirection: "row" }}>
                <Grid xs={4}>
                  <Card>
                    <Card.Body css={{ backgroundColor: cardbg }}>
                      <Card.Header css={{display: "flex",justifyContent: "center",flexDirection: "column"}}>
                        <Grid css={{ maxHeight: "50px" }}>
                          <Text h2># {String(id).padStart(3, "0")}</Text>
                        </Grid>
                        <Text h1 transform="capitalize">{name}</Text>
                        <Button color={"gradient"} ghost={!favorite} onPress={onToggleFavorites} auto> Add to Favorites </Button>
  
                        <div className="info_container_data_type">
                          {types.map((type) => (
                            <div
                              key={type.type.name}
                              className={`poke_type_bg ${type.type.name}`}
                            >
                              <Image css={{height:`60% !important`,width:`60% !important`,margin:'20%'}}
                                src={`/icons/${type.type.name}.svg`}
                                alt="poke-type"
                              />
                            </div>
                          ))}
                        </div>
                      </Card.Header>
  
                      <Card.Image
                        src={sprites.other?.home.front_default ||"/no-image.png"}
                        alt={name}
                        width="100%"
                        height={200}
                      />
                      <div className="dimensions">
                        <p>
                          <span className="info__container__headings" style={{ fontSize: "20px" }}>
                            Height:{" "}
                          </span>{" "}
                          {`${height / 10} m/${`${Math.floor(
                            (height / 10) * 3.28
                          )}'${Math.round(
                            (((height / 10) * 3.28) % 1) * 12
                          )}"`} `}{" "}
                        </p>
                        <p>
                          <span className="info__container__headings" style={{ fontSize: "20px" }}>
                            Weight:{" "}
                          </span>
                          {` ${(weight / 10).toFixed(1)} kg/${(
                            weight * 0.2205
                          ).toFixed(1)} lbs`}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Grid>
  
                <Grid xs={12}>
                  <Card>
                    <Card.Body css={{ backgroundColor: cardbg }}>
                      <Grid>
                        <Text h2 transform="capitalize">
                          Abilities
                        </Text>
  
                        <div className="info__container__data__abilities">
                          <Grid
                            className="abilities"
                            css={{ backgroundColor: "hsla(0,0%,100%,.25)" }}
                          >
                            {abilities.map((ab) => (
                              <Text
                                h5
                                transform="capitalize"
                                css={{ color: "Black" }}
                                key={ab.ability.name}
                              >
                                {ab.ability.name}
                              </Text>
                            ))}
                          </Grid>
                        </div>
                      </Grid>
                      <Grid>
                        <Text h2 transform="capitalize">
                          Base Stats
                        </Text>
  
                        <Grid
                          css={{
                            background: "White",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            borderRadius: "1rem",
                            backgroundColor: "hsla(0,0%,100%,.25)",
                          }}
                        >
                          {stats.map((stat) => (
                            // stat.stat.name
                            <Grid
                              key={stat.stat.name}
                              css={{ display: "flex", flexDirection: "column" }}
                              xs={4}
                            >
                              <Text
                                h5
                                transform="capitalize"
                                css={{ color: "white" }}
                              >
                                {stat.stat.name}
                              </Text>
                              <Text h4 css={{ color: "Black" }}>
                                {stat.base_stat}
                              </Text>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
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
                </Grid>
              </Card.Body>
            </Card>
          </Grid>
          
        </Grid.Container>
      </Layout>
    );
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // const pokemonnames = (await pokeApi.get(`/pokemon?limit=151`)).data
    // const pokemonnames = (await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')).data.results;
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonnames: string[] = data.results.map(pokemon=>pokemon.name);


    // const pokemon151 = [...Array(151)].map((values, i) => `${i + 1}`);
  
    return {
      paths: pokemonnames.map( name => ({
        params: { name },
      })),
      fallback: false,
    };
  };


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    
    return {
      props: {
        pokemon: await getPokemonInfo(name),
      },
    };
  };

export default PokemonPageName