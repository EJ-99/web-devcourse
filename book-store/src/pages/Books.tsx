import React from 'react';
import Title from '../components/common/Title';
import styled from 'styled-components';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksEmpty from '../components/books/BooksEmpty';
import Pagination from '../components/books/Pagination';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';

export default function Books() {
  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        <BooksFilter />
        <BooksViewSwitcher />
        <BooksList />
        <BooksEmpty />
        <Pagination />
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div``;
