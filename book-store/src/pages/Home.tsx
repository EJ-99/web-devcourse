import Title from '@/components/common/Title';
import MainNewBooks from '@/components/main/MainNewBooks';
import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

export default function Home() {
  const { reviews, newBooks } = useMain();
  return (
    <HomeStyle>
      {/* 배너 */}
      {/* 베스트셀러 */}
      {/* 신간 */}
      <section className='section'>
        <Title size='large'>신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>
      {/* 리뷰 */}
      <section className='section'>
        <Title size='large'>리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
