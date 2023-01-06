import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Background from '../component/background';
import Title from '../component/Title';

const image = "https://images.unsplash.com/photo-1555448248-2571daf6344b?w=1920&q=100";

const data = [
  {
    number: '1',
    id: '645162010001',
    name: 'Albert',
    lastname: 'Lee',
    nft: '1',
    minted: '0',
  },
  {
    number: '2',
    id: '645162010002',
    name: 'Kelvin',
    lastname: 'Island',
    nft: '0',
    minted: '0',
  },
  {
    number: '3',
    id: '645162010003',
    name: 'Michael',
    lastname: 'Jackson',
    nft: '1',
    minted: '0',
  },
  {
    number: '4',
    id: '645162010004',
    name: 'Jack',
    lastname: 'Sparow',
    nft: '0',
    minted: '0',
  },
];

const StudentPage = () => {
  const router = useRouter();
  const {id} = router.query;

  const value = useMemo(()=>{
    return data.filter(student=>{
      if (student.id === id) {
        return student
      }
    })
  },[id])

  return (
  <Background image={image}>
    <Title value={value} />
  </Background>)
}

export default StudentPage