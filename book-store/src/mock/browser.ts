import { setupWorker } from 'msw/browser';
import { addReview, reviewForMain, reviewsById } from './review';
import { bestBooks } from './books';

const handlers = [reviewsById, addReview, reviewForMain, bestBooks];

export const worker = setupWorker(...handlers);
