import React from 'react';
import styled from 'styled-components';
import BookItem from './BookItem';

import { Book } from '../../models/book.model';

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

export default function BooksList() {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  );
}

const BooksListStyle = styled.div``;
