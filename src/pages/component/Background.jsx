import { Flex } from "@chakra-ui/react";

export default function Background(props) {
  return (
    <Flex m='auto' style={{ backgroundImage: `url(${props.image})`, width: '100%', height: '100%' }} justifyContent='center' alignItems={'center'}>
      {props.children}

    </Flex >

  )
}