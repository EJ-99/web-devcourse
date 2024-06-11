import { login, requestReset, resetPassword, signup } from '@/api/auth.api';
import { LoginProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();

  const userLogin = (data: LoginProps) => {
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

  const userSignup = (data: LoginProps) => {
    signup(data).then((res) => {
      //성공
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  const [resetRequested, setResetRequested] = useState(false);

  const userResetPassword = (data: LoginProps) => {
    resetPassword(data).then(() => {
      showAlert('패스워드가 초기화 되었습니다.');
      navigate('/login');
    });
  };

  const userRequestReset = (data: LoginProps) => {
    requestReset(data)
      .then(() => {
        setResetRequested(true);
      })
      .catch(() => {
        showAlert('가입되지 않은 계정입니다.');
        navigate('/signup');
      });
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userRequestReset,
    resetRequested,
  };
};
