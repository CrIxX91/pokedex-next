import { Spacer, Text, useTheme, Link, Container } from '@nextui-org/react';
import Image from 'next/image';
import NextLink from 'next/link';

export const Navbar = () => {

    const {theme} =useTheme();

  return (
    <div style={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'start',
        padding:'0px 20px',
        backgroundColor:theme?.colors.gray100.value
    }}>
        <Image 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png`} 
            alt='mewtwo'
            width={70}
            height={70}
        />

        <NextLink href='/' passHref>
          <Container display='flex' alignItems='center'>
            <Text color='white' h2>P</Text>
            <Text color='white' h3>okemon</Text>
          </Container>
        </NextLink>
        
        
        <Spacer css={{flex:'1'}}/>

        <NextLink href='/favorites' passHref>
            <Text color='white' transform='capitalize'>favoritos</Text>
        </NextLink>
        

    </div>
  )
}
