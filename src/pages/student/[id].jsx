import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Background from '../component/background';
import Title from '../component/Title';
import { STUDENT as data } from '../../../constants/students';

// const image = "https://images.unsplash.com/photo-1555448248-2571daf6344b?w=1920&q=100";
const image = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/colorful-certificate-template-design-99272dc1fa74cf2a930d82288e04a672_screen.jpg?ts=1604582219";



const StudentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const value = useMemo(() => {
    return data.filter(student => {
      if (student.tokenId === id) {
        return student
      }
    })
  }, [id])

  return (
    <Box h="480" w="800">
      <Background image={image}>
        <Title value={value} />
      </Background>
    </Box>
  )
}

export default StudentPage