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

  //이전 섹션의 첫 페이지로 이동
  const onPreviousClick = () =>{
    if(currentSection === 1) return;
    const previousSection = currentSection - 1;
    // 이전 섹션의 첫 페이지 번호 계산: (이전 섹션 번호 - 1) * 10 + 1
    setCurrentPage((previousSection - 1) * 10 + 1);
    setCurrentSection(previousSection);
  }

  //다음 섹션의 첫 페이지로 이동
  const onNextClick = () =>{
    if(currentSection === totalSection) return;
    // 다음 섹션의 첫 페이지 번호 계산: (현재 섹션 번호 * 10) + 1
    setCurrentPage((currentSection*10)+1);
    setCurrentSection(currentSection + 1);
  }

  return (
      <div id='pagination-wrapper'>
        <div className='pagination-change-link-box'>
          <div className='icon-box-small'>
            {/* currentSection이 1일 때 Pre 버튼을 비활성화하는 CSS 처리가 필요할 수 있습니다. */}
            <div className='icon expand-left-icon'></div>
          </div>
          <div
              className={`pagination-change-link-text ${currentSection === 1 ? 'disabled' : ''}`} // 예시: 비활성화 스타일 적용
              onClick={onPreviousClick}
          >
            {'Pre'}
          </div>
        </div>
        <div className='pagination-divider'>{'\|'}</div>
        {viewPageList.map(page =>
            page === currentPage ?
                <div key={page} className='pagination-text-active'>{page}</div>   :
                <div key={page} className='pagination-text' onClick={() => onPageClick(page)}>{page}</div>
        )}
        <div className='pagination-divider'>{'\|'}</div>
        <div className='pagination-change-link-box'>
          <div
              className={`pagination-change-link-text ${currentSection === totalSection ? 'disabled' : ''}`} // 예시: 비활성화 스타일 적용
              onClick={onNextClick}
          >
            {'Next'}
          </div>
          <div className='icon-box-small'>
            <div className='icon expand-right-icon'></div>
          </div>
        </div>
      </div>
  )
}