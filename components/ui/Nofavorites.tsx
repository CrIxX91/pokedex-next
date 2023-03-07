import { Container, Text } from '@nextui-org/react'

export const Nofavorites = () => {
  return (
    <Container
      css={{
        display:'flex',
        flexDirection:'column',
        height:'calc(100vh - 100px)',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center'
      }} 
      >
        <Text h1> No hay favoritos</Text>

      </Container>
  )
}
