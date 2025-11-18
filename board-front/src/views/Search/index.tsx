import React, {useEffect, useState} from "react";
import './style.css';
import {useNavigate, useParams} from "react-router-dom";
import {BoardListItem} from "../../types/interface";
import BoardItem from "../../components/BoardItem";
import {SEARCH_PATH} from "../../constants";
import Pagination from "../../components/Pagination";
import {getRelationListRequest, getSearchBoardListRequest} from "../../apis";
import {GetSearchBoardListResponseDto} from "../../apis/response/board";
import {usePagination} from "../../hooks";
import ResponseDto from "../../apis/response/response.dto";
import {GetRelatedBoardListResponseDto} from "../../apis/response/search";

export default function Search() {

  const { searchWord } = useParams();
  const [count,setCount] = useState<number>(0); // 기본값 0
  const [preSearchWord,setPreSearchWord] = useState<string | null>(null);
  const [relationList,setRelationList] = useState<string[]>([]);
  const navigate = useNavigate();

  const onRelationWordClick = (word: string) =>{
    navigate(SEARCH_PATH(word));
  }

  const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDto | ResponseDto | null) =>{
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'DBE') alert('DataBase Error');
    if(code !== 'SU') return;

    if(!searchWord) return;
    const { searchList = [] } = responseBody as GetSearchBoardListResponseDto; // 안전하게 기본값 []
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  }

  const getRelationListResponse = (responseBody: GetRelatedBoardListResponseDto | ResponseDto | null)=> {
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'DBE') alert('DataBase Error');
    if(code !== 'SU') return;

    const { relationWordList = [] } = responseBody as GetRelatedBoardListResponseDto; // 기본값 []
    setRelationList(relationWordList);
  }

  const {
    currentPage,setCurrentPage,currentSection,setCurrentSection,viewList,viewPageList,totalSection,setTotalList
  } = usePagination<BoardListItem>(5);

  useEffect(() => {
    if(!searchWord) return;
    getSearchBoardListRequest(searchWord,preSearchWord).then(getSearchBoardListResponse);
    getRelationListRequest(searchWord).then(getRelationListResponse);
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
                <div className='search-contents'>
                  {viewList?.map(boardListItem => <BoardItem key={boardListItem.boardNumber} boardListItem={boardListItem}/>)}
                </div>
            }
            <div className='search-relation-box'>
              <div className='search-relation-card'>
                <div className='search-relation-card-container'>
                  <div className='search-relation-card-title'>{'관련 검색어'}</div>
                  {relationList?.length === 0 ?
                      <div className='search-relation-card-contents-nothing'>{'관련 검색어가 없습니다.'}</div> :
                      <div className='search-relation-card-contents'>
                        {relationList?.map((word, idx) => <div key={idx} className='word-badge' onClick={()=> onRelationWordClick(word)}>{word}</div>)}
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='search-pagination-box'>
            {count !== 0 && <Pagination
                currentPage = {currentPage}
                currentSection={currentSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}/>}
          </div>
        </div>
      </div>
  )
}
