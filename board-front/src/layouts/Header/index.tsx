import React, {ChangeEvent, useRef, useState, KeyboardEvent, useEffect} from "react";
import './style.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
  AUTH_PATH,
  BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
  USER_PATH
} from "../../constants";
import {useCookies} from "react-cookie";
import {useBoardStore, useLoginUserStore} from "../../stores";
import * as path from "node:path";

export default function Header() {
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
  const {pathname} = useLocation();
  const [cookies, setCookies] = useCookies();

  const [isLogin, setLogin] = useState<boolean>(false);
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  const [isMainPage, setMainPage] = useState<boolean>(false);
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  const [isUserPage, setUserPage] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLogin(loginUser !== null);
  }, [loginUser]);

  const onLogoClickHandler = () => {
    navigate(MAIN_PATH(''));
  };

  const SearchButton = () => {
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [word, setWord] = useState<string>('');
    const {searchWord} = useParams();

    const onSearchWordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setWord(event.target.value);
    };

    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };

    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(true);
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
      navigate(USER_PATH(loginUser.email));
    };

    const onSignOutButtonClick = () => {
      resetLoginUser();
      setCookies('accessToken', '', {path: '/', expires: new Date()});
      navigate(MAIN_PATH(''));
    };

    const onSignInButtonClick = () => {
      navigate(AUTH_PATH());
    };

    if (isLogin && userEmail === loginUser?.email)
      return (
          <div className="white-button" onClick={onSignOutButtonClick}>{'Logout'}</div>
      );

    if (isLogin)
      return (
          <div className="white-button" onClick={onMyPageButtonClick}>{'MyPage'}</div>
      );

    return (
        <div className='black-button' onClick={onSignInButtonClick}>{'Login'}</div>
    );
  };

  const UploadButton = () => {

    const {title, content, boardImageFileList,resetBoard} = useBoardStore();

    const onUploadButtonClick = () => {

    };

    if (title && content) {
      return <div className='black-button' onClick={onUploadButtonClick}>{'Upload'}</div>;
    }

    return <div className='disable-button'>{'Upload'}</div>;
  };

  useEffect(() => {
    setAuthPage(pathname.startsWith(AUTH_PATH()));
    setMainPage(pathname === MAIN_PATH(''));
    setSearchPage(pathname.startsWith(SEARCH_PATH('')));
    setBoardDetailPage(pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH('')));
    setBoardWritePage(pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH()));
    setBoardUpdatePage(pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH('')));
    setUserPage(pathname.startsWith(USER_PATH('')));
  }, [pathname]);

  const showSearchButton = !isBoardWritePage && !isBoardUpdatePage && (isAuthPage || isMainPage || isSearchPage || isBoardDetailPage);
  const showMyPageButton = !isBoardWritePage && !isBoardUpdatePage && (isMainPage || isSearchPage || isBoardDetailPage || isUserPage);

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
            {showSearchButton && <SearchButton />}
            {showMyPageButton && <MyPageButton />}
            {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
          </div>
        </div>
      </div>
  );
}
