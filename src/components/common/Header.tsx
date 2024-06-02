import { styled } from 'styled-components';

export default function Header() {
  return (
    <HeaderStyle>
      <h1>book store</h1>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  background-color: ${(props) => props.theme.color.background};

  h1 {
    color: ${({ theme }) => theme.color.primary};
  }
`;
