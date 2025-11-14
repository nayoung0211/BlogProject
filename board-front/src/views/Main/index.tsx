import React, {useEffect, useState} from "react";
import './style.css';
import Top3Item from "../../components/Top3Item";
import {BoardListItem} from "../../types/interface";
import {top3BoardListMock} from "../../mocks";
import lastestBoardListMock from "../../mocks/latest-board-list.mock";
import BoardItem from "../../components/BoardItem";


export default function Main() {
  //상단
  const MainTop = () =>{

    const [top3BoardList,setTop3BoardList] = useState<BoardListItem[]>([]);

    //첫 마운트시 실행될 함수
    useEffect(() => {
      setTop3BoardList(top3BoardListMock);
    },[])
    return (
        <div id='main-top-wrapper'>
          <div className='main-top-container'>
            <div className='main-top-title'>{'Nawoong Board에서 \n 다양한 이야기를 나눠보세요.'}</div>
            <div className='main-top-contents-box'>
              <div className='main-top-contents-title'>{'주간 TOP3 게시글'}</div>
              <div className='main-top-contents'>
                {top3BoardList.map(item=><Top3Item top3ListItem={item}/>)}
              </div>
            </div>
          </div>
        </div>
    )
  }


  //하단
  const MainBottom = () => {

    const [currentBoardList,setCurrentBoardList] = useState<BoardListItem[]>([]);
    const [popularWordList,setPopularWordList] = useState<string[]>([]);

    useEffect(() => {
      setCurrentBoardList(lastestBoardListMock);
      setPopularWordList(['나영','웅','바부'])
    },[])

    return (
        <div id='main-bottom-wrapper'>
          <div className='main-bottom-container'>
            <div className='main-bottom-title'>{'최신 게시물'}</div>
            <div className='main-bottom-contents-box'>
              <div className='main-bottom-current-contents'>
                {currentBoardList.map(item=><BoardItem boardListItem = {item}/>)}


              </div>
              <div className='main-bottom-popular-box'>
                <div className='main-bottom-popular-card'>
                  <div className='main-bottom-popular-card-box'>
                    <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                    <div className='main-bottom-popular-card-contents'>
                      {popularWordList.map(word=><div className='word-badge'>{word}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-bottom-pagination-box'>
              {/*<Pagination/>*/}
            </div>
          </div>
        </div>
    )
  }
  return (
      <>
        <MainTop />
        <MainBottom />
      </>
  );
}