import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'task 1',
              taskDescription: 'task description',
              taskOwner: 'YK',
            },
            {
              taskId: 'task-1',
              taskName: 'task 2',
              taskDescription: 'task description',
              taskOwner: 'WP',
            },
            {
              taskId: 'task-2',
              taskName: 'task 3',
              taskDescription: 'task description',
              taskOwner: 'SJ',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'task 4',
              taskDescription: 'task description',
              taskOwner: 'DW',
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
});

export const boardReducer = boardSlice.reducer;
