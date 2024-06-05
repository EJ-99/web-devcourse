import { Pagination } from './../models/pagination.model';
import { Book } from '../models/book.model';
import { httpClient } from './http';

interface FetchBooksParams {
  categoryId?: number;
  new?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params,
    });

    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};
