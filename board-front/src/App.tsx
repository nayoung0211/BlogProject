import './App.css';
import Footer from "./layouts/Footer";
import {Route,Routes} from "react-router-dom";
import Main from "./views/Main";
import Authentication from "./views/Authentication";
import Search from "./views/Search";
import User from "./views/User";
import BoardDetail from "./views/Board/Detail";
import BoardWrite from "./views/Board/Write";
import BoardUpdate from "./views/Board/Update";
import Container from "./layouts/Container";
import {
  AUTH_PATH, BOARD_DETAIL_PATH,
  BOARD_PATH, BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
  USER_PATH
} from "./constants";


function App() {
  // 메인 화면 : '/' - Main
  //로그인 + 회원 가입 : '/auth' - Authentication
  //검색 화면 : '/search/:searchWord' -search
  //유저 페이지 : '/user/:userEmail' -User
  //게시물 상세보기 : '/board/detail/:boardNumber - BoardDetail
  //게시물 작성하기 : '/board/write' - BoardWrite
  //게시물 수정하기 : '/board/update/:boardNumber' -BoardUpdate
  return (
      <Routes>
        <Route element={<Container/>}>
        <Route path={MAIN_PATH()} element={<Main/>}/>
        <Route path={AUTH_PATH()} element={<Authentication/>}/>
        <Route path={SEARCH_PATH(':searchWord')} element={<Search/>}/>
        <Route path={USER_PATH(':userEmail')} element={<User/>}/>
        <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite/>}/>
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail/>}/>
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate/>}/>
        </Route>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Route>
      </Routes>
  );
}

export default App;
