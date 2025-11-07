import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import './style.css';
import FavoriteItem from "../../../components/FavoriteItem";
import {commentListMock, favoriteListMock} from "../../../mocks";
import {Board, CommentListItem, FavoriteListItem} from "../../../types/interface";
import CommentItem from "../../../components/CommentItem";
import Pagination from "../../../components/Pagination";
import defaultProfileImage from 'assets/image/default-profile-image.png'
import {useLoginUserStore} from "../../../stores";
import {useNavigate, useParams} from "react-router-dom";
import {BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH} from "../../../constants";
import {getBoardRequest, increaseViewCountRequest} from "../../../apis";
import GetBoardResponseDTO from "../../../apis/response/board/get-board.response.dto";
import ResponseDto from "../../../apis/response/response.dto";
import IncreaseViewCountResponseDto from "../../../apis/response/board/increase-view-count.response.dto";

export default function BoardDetail() {
  const {loginUser}=useLoginUserStore();
  const {boardNumber} = useParams();

  const navigator = useNavigate();

  const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) =>{
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'NB') alert ('존재하지 않는 게시물입니다.');
    if(code === 'DBE') alert ('데이터 베이스 오류입니다.');
    return;
  }

  const BoardDetailTop = () => {

    const [showMore,setShowMore] = useState<boolean>(false);
    const [board,setBoard] = useState<Board | null>(null);

    const getBoardResponse = (responseBody: GetBoardResponseDTO | ResponseDto | null)=> {
      if(!responseBody) return;
      const {code} = responseBody;
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !=='SU') {
        navigator(MAIN_PATH());
        return;
      }
      const board: Board = {...responseBody as GetBoardResponseDTO};
      setBoard(board);
    }

    const onMoreButtonClick = () =>{
      setShowMore(!showMore);
    }
    const onNicknameClick = () =>{
      if(!board) return;
      navigator(USER_PATH(board.writerEmail));
    }
    const onUpdateButtonClick = () =>{
      if(!board || !loginUser) return;
      if(loginUser.email !== board.writerEmail) return;
      navigator(BOARD_PATH()+'/'+BOARD_UPDATE_PATH(board.boardNumber));
    }
    const onDeleteButtonClick = () =>{
      if(!board || !loginUser) return;
      if(loginUser.email !== board.writerEmail) return;
      //TODO:Delete Request
      navigator(MAIN_PATH());
    }

    useEffect(() => {
      if(!boardNumber) {
        navigator(MAIN_PATH());
        return;
      }
      getBoardRequest(boardNumber).then(getBoardResponse);
    }, [boardNumber]);

    if(!board) return null;
    return (
        <div id='board-detail-top'>
          <div className='board-detail-top-header'>
            <div className='board-detail-title'>{board.title}</div>
            <div className='board-detail-top-sub-box'>
              <div className='board-detail-write-info-box'>
                <div
                    className='board-detail-writer-profile-image'
                    style={{ backgroundImage: `url(${board.writerProfileImage ? board.writerProfileImage : defaultProfileImage})` }}
                ></div>
                <div className='board-detail-writer-nickname' onClick={onNicknameClick}>{board.writerNickname}</div>
                <div className='board-detail-info-divider'>{'|'}</div>
                <div className='board-detail-write-date'>{board.writeDatetime}</div>
              </div>
              <div className='icon-button' onClick={onMoreButtonClick}>
                <div className='icon more-icon'></div>
              </div>
              {showMore &&
                  <div className='board-detail-more-box'>
                    <div className='board-detail-update-button' onClick={onUpdateButtonClick}>{'update'}</div>
                    <div className='divider'></div>
                    <div className='board-detail-delete-button' onClick={onDeleteButtonClick}>{'delete'}</div>
                  </div>
              }
            </div>
          </div>
          <div className='divider'></div>
          <div className='board-detail-top-main'>
            <div className='board-detail-main-text'>{board.content}</div>
            {board.boardImageList.map(image =><img className='board-detail-main-image' src={image}/>)}
          </div>
        </div>
    );
  };

  const BoardDetailBottom = () =>{

    const [favoriteList,setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [commentList,setCommentList] = useState<CommentListItem[]>([]);
    const [isFavorite,setFavorite] = useState<boolean>(false);
    const [showFavorite,setShowFavorite] = useState<boolean>(false);
    const [showComment,setShowComment] = useState<boolean>(false);
    const [comment,setComment] = useState<string>('');
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    const isMounted = useRef(false);

    const onFavoriteClick = () =>{
      setFavorite(!isFavorite);
    }
    const onShowFavoriteButtonClick = () =>{
      setShowFavorite(!showFavorite);
    }
    const onShowCommentButtonClick = () =>{
      setShowComment(!showComment);
    }
    const onCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) =>{
      const { value } = event.target;
      setComment(value);
      if(!commentRef.current) return;
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
    const onAddComment = () =>{
      if(!comment) return;
      alert('!!');
    }

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    }, [boardNumber]);

    useEffect(() => {
      if (!boardNumber) return;

      if (!isMounted.current) {
        isMounted.current = true;
        increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
      }

      return () => {
        isMounted.current = false;
      };
    }, [boardNumber]);

    return (
        <div id='board-detail-bottom'>
          <div className='board-detail-bottom-button-box'>
            <div className='board-detail-bottom-button-group'>
              <div className='icon-button' onClick={onFavoriteClick}>
                {isFavorite ?
                    <div className='icon favorite-fill-icon'></div> :
                    <div className='icon favorite-light-icon'></div>
                }
              </div>
              <div className='board-detail-bottom-button-text'>{`like ${favoriteList.length}`}</div>
              <div className='icon-button' onClick={onShowFavoriteButtonClick}>
                {showFavorite ?
                    <div className='icon up-light-icon'></div> :
                    <div className='icon down-light-icon'></div>
                }
              </div>
            </div>
            <div className='board-detail-bottom-button-group'>
              <div className='icon-button'>
                <div className='icon comment-icon'></div>
              </div>
              <div className='board-detail-bottom-button-text'>{`comment ${commentList.length}`}</div>
              <div className='icon-button' onClick={onShowCommentButtonClick}>
                {showComment ?
                    <div className='icon up-light-icon'></div> :
                    <div className='icon down-light-icon'></div>
                }
              </div>
            </div>
          </div>
          {showFavorite &&
              <div className='board-detail-bottom-favorite-box'>
                <div className='board-detail-bottom-favorite-container'>
                  <div className='board-detail-bottom-favorite-title'>{'like '}<span className='emphasis'>{favoriteList.length}</span></div>
                  <div className='board-detail-bottom-favorite-contents'>
                    {favoriteList.map(item =><FavoriteItem favoriteListItem={item}/>)}
                  </div>
                </div>
              </div>
          }
          {showComment &&
              <div className='board-detail-bottom-comment-box'>
                <div className='board-detail-bottom-comment-container'>
                  <div className='board-detail-bottom-comment-title'>{'comment '}<span className='emphasis'>{commentList.length}</span></div>
                  <div className='board-detail-bottom-comment-list-container'>
                    {commentList.map(item =><CommentItem commentListItem={item}/>)}
                  </div>
                </div>

                <div className='divider'></div>
                <div className='board-detail-bottom-comment-pagination-box'>
                  <Pagination/>
                </div>
                <div className='board-detail-bottom-comment-input-box'>
                  <div className='board-detail-bottom-comment-input-container'>
                <textarea
                    ref={commentRef}
                    className='board-detail-bottom-comment-textarea'
                    placeholder='Enter the comment'
                    value={comment}
                    onChange={onCommentChange}
                />
                    <div className='board-detail-bottom-comment-button-box'>
                      <div className={comment.trim() === '' ? 'disable-button' : 'black-button'}
                           onClick={onAddComment}>{'Add'}</div>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
    );
  };

  return (
      <div id='board-detail-wrapper'>
        <div className='board-detail-container'>
          <BoardDetailTop />
          <BoardDetailBottom/>
        </div>
      </div>
  )
}