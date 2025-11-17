import React, {useEffect, useState} from "react";
import './style.css';
import Top3Item from "../../components/Top3Item";
import {BoardListItem} from "../../types/interface";
import {top3BoardListMock} from "../../mocks";
import lastestBoardListMock from "../../mocks/latest-board-list.mock";
import BoardItem from "../../components/BoardItem";
import {useNavigate} from "react-router-dom";
import {SEARCH_PATH} from "../../constants";
import {
  getLatestBoardListRequest,
  getPopularListRequest,
  getTop3BoardListRequest
} from "../../apis";
import {
  GetLatestBoardListResponseDto,
  GetTop3BoardListResponseDto
} from "../../apis/response/board";
import ResponseDto from "../../apis/response/response.dto";
import {usePagination} from "../../hooks";
import Pagination from "../../components/Pagination";
import {GetPopularListResponseDto} from "../../apis/response/search";


export default function Main() {
  const navigate = useNavigate();
  //상단
  const MainTop = () =>{

    const [top3BoardList,setTop3BoardList] = useState<BoardListItem[]>([]);

    const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'DBE') alert('DataBase Error');
      if(code !== 'SU') return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    }

    //첫 마운트시 실행될 함수
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
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
    //페이지네이션 관련 상태
    const {
      currentPage,setCurrentPage,currentSection,setCurrentSection,viewList,viewPageList,totalSection,setTotalList
    } = usePagination<BoardListItem>(5);
    const [popularWordList,setPopularWordList] = useState<string[]>([]);
    //인기검색어 클릭 핸들러
    const onPopularWordClick = (word: string) =>{
      navigate(SEARCH_PATH(word));
    }
    const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null)  =>{
      if (!responseBody) return;
      const { code } = responseBody;
      if(code === 'DBE') alert('DataBase Error');
      if(code !== 'SU') return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    }
    const getPopularListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if(code === 'DBE') alert('DataBase Error');
      if(code !== 'SU') return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    }


    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse)
      getPopularListRequest().then(getPopularListResponse)
    },[])

    return (
        <div id='main-bottom-wrapper'>
          <div className='main-bottom-container'>
            <div className='main-bottom-title'>{'최신 게시물'}</div>
            <div className='main-bottom-contents-box'>
              <div className='main-bottom-current-contents'>
                {viewList.map(item=><BoardItem boardListItem = {item}/>)}


              </div>
              <div className='main-bottom-popular-box'>
                <div className='main-bottom-popular-card'>
                  <div className='main-bottom-popular-card-container'>
                    <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                    <div className='main-bottom-popular-card-contents'>
                      {popularWordList.map(word=><div className='word-badge' onClick={()=>onPopularWordClick(word)}>{word}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-bottom-pagination-box'>
              <Pagination
              currentPage = {currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
              />
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