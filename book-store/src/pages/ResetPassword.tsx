import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginProps, SignupStyle } from './Signup';
import { useAuth } from '@/hooks/useAuth';

export default function ResetPassword() {
  const { userResetPassword, userRequestReset, resetRequested } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    resetRequested ? userResetPassword(data) : userRequestReset(data);
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
