import { styled } from 'styled-components';
import logo from '../../assets/images/logo.png';
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaBars,
  FaAngleRight,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { useAuthStore } from '../../store/authStore';
import { QUERYSTRING } from '../../constants/querystring';
import DropDown from './DropDown';
import ThemeSwitcher from '../header/ThemeSwitcher';
import { useState } from 'react';

export default function Header() {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    storeLogout();
    navigate('/');
  };

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className='logo'>
        <Link to='/'>
          {' '}
          <img src={logo} alt='book store' />
        </Link>
      </h1>
      <nav className='category'>
        <button
          className='menu-button'
          onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <Link
                to={`/books${
                  item.id === null
                    ? `?${QUERYSTRING.VIEW}=grid`
                    : `?${QUERYSTRING.CATEGORY_ID}=${item.id}&${QUERYSTRING.VIEW}=grid`
                }`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className='auth'>
        <DropDown toggleButton={<FaUserCircle />}>
          <>
            {isLoggedIn && (
              <ul>
                <li>
                  <Link to='/cart'>장바구니</Link>
                </li>
                <li>
                  <Link to='/orderlist'>주문 내역</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt />
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to='/signup'>
                    <FaRegUser />
                    회원가입
                  </Link>
                </li>
              </ul>
            )}
            <ThemeSwitcher />
          </>
        </DropDown>
      </nav>
    </HeaderStyle>
  );
}

interface HeaderStyleProps {
  $isOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }

    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: max-content;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1.5;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 52px;

    .logo {
      padding-left: 12px;
      img {
        width: 140px;
      }
    }

    .auth {
      padding-right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 12px;
        right: ${({ $isOpen }) => ($isOpen ? '4px' : '52px')};
        background: rgba(255, 255, 255, 0.4);
        border: none;
        font-size: 1.5rem;
        z-index: 1001;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;

        li {
          a {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;
