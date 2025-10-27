import React, {ChangeEvent, useRef, useState, KeyboardEvent, useEffect} from "react";
import './style.css';
import {useNavigate, useParams} from "react-router-dom";
import {AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH} from "../../constants";
import {useCookies} from "react-cookie";
import {useLoginUserStore} from "../../stores";

export default function Header() {
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
  const [cookies, setCookies] = useCookies();
  const [isLogin, setLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  // ✅ 로그인 상태 동기화 — 최상단 useEffect로 이동
  useEffect(() => {
    setLogin(loginUser !== null);
  }, [loginUser]);

  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  const SearchButton = () => {
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [word, setWord] = useState<string>('');
    const {searchWord} = useParams();

    const onSearchWordChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    };

    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };

    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    useEffect(() => {
      if (searchWord) setWord(searchWord);
      setStatus(true);
    }, [searchWord]);

    if (!status)
      return (
          <div className='icon-button' onClick={onSearchButtonClickHandler}>
            <div className='icon search-light-icon'></div>
          </div>
      );

    return (
        <div className='header-search-input-box'>
          <input
              className='header-search-input'
              type='text'
              placeholder='Enter a keyword.'
              value={word}
              onChange={onSearchWordChange}
              onKeyDown={onSearchWordKeyDownHandler}
          />
          <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
            <div className='icon search-light-icon'></div>
          </div>
        </div>
    );
  };

  const MyPageButton = () => {
    const {userEmail} = useParams();

    const onMyPageButtonClick = () => {
      if (!loginUser) return;
      const {email} = loginUser;
      navigate(USER_PATH(email));
    };

    const onSignOutButtonClick = () => {
      resetLoginUser();
      setCookies('accessToken', '', {path: '/', expires: new Date()});
      navigate(MAIN_PATH());
    };

    const onSignInButtonClick = () => {
      navigate(AUTH_PATH());
    };

    // ✅ 수정 1: userEmail이 없을 때도 MyPage 표시되도록 변경
    if (isLogin && userEmail === loginUser?.email)
      return (
          <div className="white-button" onClick={onSignOutButtonClick}>{'Logout'}</div>
      );

    // ✅ 수정 2: 단순히 로그인했으면 MyPage 표시
    if (isLogin)
      return (
          <div className="white-button" onClick={onMyPageButtonClick}>{'MyPage'}</div>
      );

    return (
        <div className='black-button' onClick={onSignInButtonClick}>{'Login'}</div>
    );
  };

  return (
      <div id='header'>
        <div className='header-container'>
          <div className='header-left-box' onClick={onLogoClickHandler}>
            <div className='icon-box'>
              <div className='icon logo-dark-icon'></div>
            </div>
            <div className='header-logo'>{'NaWoong Board'}</div>
          </div>
          <div className='header-right-box'>
            <SearchButton />
            <MyPageButton />
          </div>
        </div>
      </div>
  );
}
