import React from 'react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { render } from '@testing-library/react';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { formatNumber } from '../../utils/format';
import { getImgSrc } from '../../utils/image';

const dummyBook: Book = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  categoryId: 1,
  summary: 'Dummy Summary',
  author: 'Dummy Author',
  price: 10000,
  likes: 1,
  form: 'paperbook',
  isbn: 'Dummy ISBN',
  detail: 'Dummy Detail',
  pages: 100,
  contents: 'Dummy Detail',
  pubDate: '2024-06-04',
};

describe('BookItem 테스트', () => {
  it('렌더 확인', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText(`${formatNumber(dummyBook.price)}원`)).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      getImgSrc(dummyBook.img)
    );
  });
});
