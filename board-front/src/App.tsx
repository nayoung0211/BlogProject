import React, {useState} from 'react';
import './App.css';
import BoardItem from "./components/BoardItem";
import latestBoardListMock from "./mocks/latest-board-list.mock";
import type BoardListItemType from './types/interface/board-list-item.interface';
import Top3Item from "./components/Top3Item";
import {commentListMock, favoriteListMock, top3BoardListMock} from "./mocks";
import CommentItem from "./components/CommentItem";
import FavoriteItem from "./components/favoritesItem";
import InputBox from "./components/InputBox";

function App() {
  const [value,setValue] = useState<string>('');

  return (
      <>
       <InputBox label='email' type='text' placeholder='이메일 주소를 입력해주세요' value={value} setValue={setValue} error={false}/>
      </>
  );
}

export default App;
