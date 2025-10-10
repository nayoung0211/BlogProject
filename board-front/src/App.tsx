import React from 'react';
import './App.css';
import BoardItem from "./components/BoardItem";
import latestBoardListMock from "./mocks/latest-board-list.mock";
import type BoardListItemType from './types/interface/board-list-item.interface';
import Top3Item from "./components/Top3Item";
import {top3BoardListMock} from "./mocks";

function App() {
  return (
      <>
        <div style={{display: 'flex', justifyContent: 'center',gap: '10px'}}>
          {top3BoardListMock.map(top3ListItem =><Top3Item top3ListItem={top3ListItem} />)}
        </div>
      </>
  );
}

export default App;
