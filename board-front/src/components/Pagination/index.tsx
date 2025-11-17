import React, {Dispatch, SetStateAction} from "react";
import './style.css';

interface Props {
  currentPage: number;
  currentSection: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;

  viewPageList: number[];
  totalSection: number;
}

export default function Pagination(props: Props) {

  const {currentPage,currentSection,viewPageList,totalSection} = props;
  const {setCurrentSection,setCurrentPage} = props;

  //페이지 번호 클릭 이벤트 처리
  const onPageClick = (page: number) => {
    setCurrentPage(page);
  }
  //이전 클릭 이벤트 처리
  const onPreviousClick = () =>{
    if(currentSection === 1) return;
    setCurrentPage((currentSection - 1)*10);
    setCurrentSection(currentSection - 1);
  }
  //다음 클릭 이벤트
  const onNextClick = () =>{
    if(currentSection === totalSection) return;
    setCurrentPage((currentSection*10)+1);
    setCurrentSection(currentSection + 1);

  }

  return (
      <div id='pagination-wrapper'>
        <div className='pagination-change-link-box'>
          <div className='icon-box-small'>
            <div className='icon expand-left-icon'></div>
          </div>
          <div className='pagination-change-link-text' onClick={onPreviousClick}>{'Pre'}</div>
        </div>
        <div className='pagination-divider'>{'\|'}</div>
        {viewPageList.map(page =>
            page === currentPage ?
                <div className='pagination-text-active'>{page}</div>   :
                <div className='pagination-text' onClick={() => onPageClick(page)}>{page}</div>
        )}
        <div className='pagination-divider'>{'\|'}</div>
        <div className='pagination-change-link-box'>
          <div className='pagination-change-link-text' onClick={onNextClick}>{'Next'}</div>
          <div className='icon-box-small'>
            <div className='icon expand-right-icon'></div>
          </div>
        </div>
      </div>
  )
}