import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { colorTypeGradients, hexToRGB, localFavorites } from "@/utils";
import {Button,Card,Container,Grid,Image,Text} from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  
  const { name, sprites, types, id, height, weight, abilities, stats } = pokemon;
  let finalColor;

  // const [isFavorite, setIsFavorite] = useState(false);
  const [favorite, setFavorite] = useState(false);
  // console.log(isFavorite);

  useEffect(() => {
  setFavorite(localFavorites.existFavorites(id));
    
  }, [])


  const onToggleFavorites = () => {
    setFavorite(!favorite);
    localFavorites.toggleFavorite(id);
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
                      src={sprites.other?.dream_world.front_default ||"/no-image.png"}
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
                              css={{ color: "Red" }}
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
        <Grid></Grid>

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
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((values, i) => `${i + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
