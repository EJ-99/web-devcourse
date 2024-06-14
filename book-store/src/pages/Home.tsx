import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

export default function Home() {
  const { reviews } = useMain();
  return (
    <HomeStyle>
      {/* 배너 */}
      {/* 베스트셀러 */}
      {/* 신간 */}
      {/* 리뷰 */}
      <MainReview reviews={reviews} />
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;
