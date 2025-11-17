import React, {useEffect, useState} from "react";
import './style.css';
import {useNavigate, useParams} from "react-router-dom";
import * as sea from "node:sea";
import {BoardListItem} from "../../types/interface";
import {latestBoardListMock} from "../../mocks";
import BoardItem from "../../components/BoardItem";
import {SEARCH_PATH} from "../../constants";
import Pagination from "../../components/Pagination";

export default function Search() {

  //state searchWord path //
  const { searchWord } = useParams();

  //검색 게시물 개수 상태 //
  const [count,setCount] = useState<number>(2);

  //검색 게시물 리스트 상태 //
  const [searchBoardList,setSearchBoardList] = useState<BoardListItem[]>([]);

  //관련 검색어 리스트 상태 //
  const [relationList,setRelationList] = useState<string[]>([]);

  const navigate = useNavigate();

  const onRelationWordClick = (word: string) =>{
    navigate(SEARCH_PATH(word));
  }

  useEffect(() => {
    setSearchBoardList(latestBoardListMock);
  },[searchWord]);

  if(!searchWord) return(<></>)
  return (
      <div id='search-wrapper'>
        <div className='search-container'>
          <div className='search-title-box'>
            <div className='search-title'><span className='search-title-emphasis'>{searchWord}</span>{'에 대한 검색 결과입니다.'}</div>
            <div className='search-count'>{count}</div>
          </div>
          <div className='search-contents-box'>
            {count === 0 ? <div className='search-contents-nothing'>{'검색 결과가 없습니다.'}</div> :
                <div className='search-contents'>{searchBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)}</div>
            }
            <div className='search-relation-box'>
              <div className='search-relation-card'>
                <div className='search-relation-card-container'>
                  <div className='search-relation-card-title'></div>
                  <div className='search-relation-card-contents'>
                    {relationList.length === 0?
                    <div className='search-relation-card-contents-nothing'></div> :
                        <div className='search-relation-card-contents'>
                        {relationList.map(word => <div className='word-badge' onClick={()=> onRelationWordClick(word)}>{word}</div>)}
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='search-pagination-box'>
            {/*<Pagination/>*/}
            </div>
        </div>
      </div>
  )
}