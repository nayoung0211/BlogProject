import React, {useEffect, useState} from "react";
import './style.css';
import FavoriteItem from "../../../components/FavoritesItem";
import {favoriteListMock} from "../../../mocks";


export default function BoardDetail() {

  const BoardDetailTop = () =>{
    return (
        <div id='board-detail-top'>
          <div className='board-detail-top-header'>
            <div className='board-detail-title'>{'오늘 점심 머먹지'}</div>
            <div className='board-detail-top-sub-box'>
              <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image'></div>
                <div className='board-detail-writer-nickname'>{'나나웅웅이'}</div>
                <div className='board-detail-info-divider'>{'\|'}</div>
                <div className='board-detail-write-date'>{'2025.11.05'}</div>
              </div>
              <div className='icon-button'>
                <div className='icon more-icon'></div>
              </div>
              <div className='board-detail-more-box'>
                <div className='board-detail-update-button'>{'update'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button'>{'delete'}</div>
              </div>
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-top-main'>
            <div className='board-detail-main-text'>{'나는 편의점 갈거야'}</div>
            <div className='board-detail-main-image'></div>
          </div>
        </div>
    );
  }

  const BoardDetailBottom = () =>{
    const [favoriteList,setFavoriteList] = useState<FavoriteListItem[]>([]);

    useEffect(() => {
      setFavoriteList(favoriteListMock);
    }, []);

    return (
        <div id='board-detail-bottom'>
          <div className='board-detail-bottom-button-box'>
            <div className='board-detail-bottom-button-group'>
              <div className='icon-button'>
                <div className='icon favorite-fill-icon'></div>
              </div>
              <div className='board-detail-bottom-button-text'>{`like ${12}`}</div>
              <div className='icon-button'>
                <div className='icon up-light-icon'></div>
              </div>
            </div>
            <div className='board-detail-bottom-button-group'>
              <div className='icon-button'>
                <div className='icon comment-icon'></div>
              </div>
              <div className='board-detail-bottom-button-text'>{`comment ${12}`}</div>
              <div className='icon-button'>
                <div className='icon up-light-icon'></div>
              </div>
            </div>
          </div>
          <div className='board-detail-bottom-favorite-box'>
            <div className='board-detail-bottom-favorite-container'>
              <div className='board-detail-bottom-favorite-title'>{'like'}<span className='emphasis'>{12}</span></div>
              <div className='board-detail-bottom-favorite-contents'>
                {favoriteList.map(item =><FavoriteItem favoriteListItem={item}/>)}
              </div>
            </div>
          </div>
          <div className='board-detail-bottom-comment-box'></div>
        </div>
    )
  }

  return (
      <div id='board-detail-wrapper'>
        <div className='board-detail-container'>
          <BoardDetailTop />
          <BoardDetailBottom/>
        </div>
      </div>
  )
}