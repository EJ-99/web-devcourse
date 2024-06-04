import React, { useState } from 'react';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { requestReset, resetPassword } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';
import { SignupProps, SignupStyle } from './Signup';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [resetRequested, setResetRequested] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      // 초기화
      resetPassword(data).then(() => {
        showAlert('패스워드가 초기화 되었습니다.');
        navigate('/login');
      });
    } else {
      // 요청
      requestReset(data)
        .then(() => {
          setResetRequested(true);
        })
        .catch(() => {
          showAlert('가입되지 않은 계정입니다.');
          navigate('/signup');
        });
    }
  };

  return (
    <>
      <Title size='large'>패스워드 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder='이메일'
              inputType='email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='error-text'>이메일을 입력해주세요</p>
            )}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                placeholder='패스워드'
                inputType='password'
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className='error-text'>패스워드를 입력해주세요</p>
              )}
            </fieldset>
          )}
          <fieldset>
            <Button type='submit' size='medium' scheme='primary'>
              {resetRequested ? '패스워드 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/login'>로그인</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}
