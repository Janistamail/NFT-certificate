import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Background from '../component/background';
import Title from '../component/Title';
import { STUDENT as data } from '../../../constants/students';

const image = "https://images.unsplash.com/photo-1555448248-2571daf6344b?w=1920&q=100";


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
    <Background image={image}>
      <Title value={value} />
    </Background>)
}

export default StudentPage