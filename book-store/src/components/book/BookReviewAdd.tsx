import { BookReviewItemWrite } from '@/models/book.model';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  onAdd: (data: BookReviewItemWrite) => void;
}

export default function BookReviewAdd({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea {...register('content', { required: true })}></textarea>
          {errors.content && (
            <p className='error-text'>리뷰 내용을 입력해주세요.</p>
          )}
        </fieldset>
        <div className='submit'>
          <fieldset>
            <select
              {...register('score', { required: true, valueAsNumber: true })}>
              {Array.from({ length: 5 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}점
                </option>
              ))}
            </select>
          </fieldset>
          <Button size='medium' scheme='primary'>
            작성하기
          </Button>
        </div>
      </form>
    </BookReviewAddStyle>
  );
}

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .error-text {
        color: red;
        padding: 0;
        margin: 0;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: 1px solid ${({ theme }) => theme.color.border};
      padding: 12px;
    }

    select {
      border-radius: ${({ theme }) => theme.borderRadius.default};
      height: 100%;
    }

    .submit {
      display: flex;
      justify-content: end;
      gap: 12px;
    }
  }
`;
