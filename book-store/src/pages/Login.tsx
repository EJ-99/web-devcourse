import React from 'react';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from '../hooks/useAlert';
import { SignupProps, SignupStyle } from './Signup';
import { login } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const { storeLogin } = useAuthStore();

  const onSubmit = (data: SignupProps) => {
    login(data)
      .then((res) => {
        storeLogin(res.token);

        showAlert('로그인 완료되었습니다.');
        navigate('/');
      })
      .catch(() => {
        showAlert('이메일 혹은 패스워드가 일치하지 않습니다.');
      });
  };

  return (
    <>
      <Title size='large'>로그인</Title>
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
          <fieldset>
            <Button type='submit' size='medium' scheme='primary'>
              로그인
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/reset'>패스워드 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}
