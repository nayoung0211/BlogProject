import React from 'react';

//components : Board List Item 컴포넌트
export default function BoardListItem(){

  //render : Board List Item 컴포넌트 렌더링
  return (
      <div className='board-list-item'>
        <div className='board-list-item-box'>
          <div className='board-list-item-top'></div>
        <div className='board-list-item-middle'></div>
        <div className='board-list-item-bottom'></div>
        </div>
        <div className='board-list-item-image'></div>
      </div>
  )
}