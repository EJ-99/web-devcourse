import { useEffect, useState } from 'react';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import {
  BookDetail,
  BookReviewItem,
  BookReviewItemWrite,
} from '../models/book.model';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';
import { addBookReview, fetchBookReview } from '@/api/review.api';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const addToCart = (quantity: number) => {
    //권한 확인
    if (!isLoggedIn) {
      showAlert('로그인이 필요한 기능입니다.');
      return;
    }

    if (!book) return;

    addCart({
      bookId: book.id,
      quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  const likeToggle = () => {
    //권한 확인
    if (!isLoggedIn) {
      showAlert('로그인이 필요한 기능입니다.');
      return;
    }

    if (!book) return;

    if (book.liked) {
      unlikeBook(book.id).then(() => {
        //낙관적 업데이트
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      showAlert(res?.message);
    });
  };

  return { book, likeToggle, cartAdded, addToCart, reviews, addReview };
};
