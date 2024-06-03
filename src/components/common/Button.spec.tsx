import { render, screen } from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe('Button 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    // 2. 확인
    // 화면에서 렌더한 요소를 선택해서 document 안에 있는지 확인
    expect(screen.getByText('버튼')).toBeInTheDocument();
  });

  it('size props 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('scheme props 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({
      color: 'white',
      backgroundColor: 'midnightblue',
    });
  });

  it('disabled props 적용', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary' disabled>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({
      opacity: 0.5,
      pointerEvents: 'none',
    });
  });
});
