import { Flex } from "@chakra-ui/react";

export default function Background(props) {
  return (
    <Flex  m='auto' h='700px' w='1000px' style={{ backgroundImage: `url(${props.image})`}} justifyContent='center' alignItems={'center'}>
      { props.children }
    </Flex>
    
  )
}