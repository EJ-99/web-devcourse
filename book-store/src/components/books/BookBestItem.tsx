import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem, { BooksItemStyle } from './BookItem';

interface Props {
  book: Book;
  itemIndex: number;
}

export default function BookBestItem({ book, itemIndex }: Props) {
  return (
    <BookBestItemStyle>
      <BookItem book={book} view='grid' />
      <div className='rank'>{itemIndex + 1}</div>
    </BookBestItemStyle>
  );
}

const BookBestItemStyle = styled.div`
  ${BooksItemStyle} {
    .summary,
    .price,
    .likes {
      display: none;
    }

    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  position: relative;

  .rank {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 35px;
    height: 35px;
    background: ${({ theme }) => theme.color.primary};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    font-style: italic;
  }
`;
