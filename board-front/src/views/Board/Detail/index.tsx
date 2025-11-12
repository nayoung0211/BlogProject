import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import './style.css';
import FavoriteItem from "../../../components/FavoriteItem";
import {Board, CommentListItem, FavoriteListItem} from "../../../types/interface";
import CommentItem from "../../../components/CommentItem";
import Pagination from "../../../components/Pagination";
import defaultProfileImage from 'assets/image/default-profile-image.png'
import {useLoginUserStore} from "../../../stores";
import {useNavigate, useParams} from "react-router-dom";
import {BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH} from "../../../constants";
import {
  deleteBoardsRequest,
  getBoardRequest,
  getCommentListRequest,
  getFavoriteListRequest,
  increaseViewCountRequest, postCommentRequest, putFavoriteRequest
} from "../../../apis";
import GetBoardResponseDTO from "../../../apis/response/board/get-board.response.dto";
import ResponseDto from "../../../apis/response/response.dto";
import IncreaseViewCountResponseDto from "../../../apis/response/board/increase-view-count.response.dto";
import dayjs from "dayjs";
import {
  DeleteBoardResponseDto,
  GetCommentListResponseDto,
  GetFavoriteListResponseDTO,
  PutFavoriteResponseDto
} from "../../../apis/response/board";
import {useCookies} from "react-cookie";
import {PostCommentRequestDto} from "../../../apis/request/board";
import PostCommentResponseDto from "../../../apis/response/board/post-comment.response.dto";
import {usePagination} from "../../../hooks";

export default function BoardDetail() {
  const {loginUser}=useLoginUserStore();
  const {boardNumber} = useParams();
  const [cookies,setCookies] = useCookies();

  const navigator = useNavigate();

  const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) =>{
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'NB') alert ('존재하지 않는 게시물입니다.');
    if(code === 'DBE') alert ('데이터 베이스 오류입니다.');
    return;
  }

  const BoardDetailTop = () => {

    const [isWriter,setWriter] = useState<boolean>(false);
    const [showMore,setShowMore] = useState<boolean>(false);
    const [board,setBoard] = useState<Board | null>(null);

    const getWriteDatetimeFormat = () =>{
      if(!board) return '';
      const date = dayjs(board.writeDatetime);
      return date.format('YYYY.MM.DD');
    }

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
      if(!loginUser) {
        setWriter(false);
        return;
      }
      const isWriter = loginUser.email === board.writerEmail;
      setWriter(isWriter);
    }

    const deleteBoardsResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null)=>{
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'VF') alert('잘못된 접근입니다.');
      if(code === 'NU') alert('존재하지 않는 유저입니다.');
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'AF') alert('인증에 실패했습니다.');
      if(code === 'NP') alert('권한이 없습니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      navigator(MAIN_PATH());
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
      if(!board || !loginUser || !boardNumber) return;
      if(loginUser.email !== board.writerEmail) return;

      deleteBoardsRequest(boardNumber,cookies.accessToken).then(deleteBoardsResponse);
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
                <div className='board-detail-write-date'>{getWriteDatetimeFormat()}</div>
              </div>
              {isWriter &&
              <div className='icon-button' onClick={onMoreButtonClick}>
                <div className='icon more-icon'></div>
              </div>
              }
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
            {board.boardImageList.map(image =><img alt='게시판 이미지' className='board-detail-main-image' src={image}/>)}
          </div>
        </div>
    );
  };


  const BoardDetailBottom = () =>{
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const {currentPage, setCurrentPage, currentSection, setCurrentSection, viewList, viewPageList, totalSection, setTotalList} = usePagination<CommentListItem>(3);
    const [favoriteList,setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [isFavorite,setFavorite] = useState<boolean>(false);
    const [showFavorite,setShowFavorite] = useState<boolean>(false);
    const [showComment,setShowComment] = useState<boolean>(false);
    const [comment,setComment] = useState<string>('');
    const [totalCommentCount,setTotalCommentCount] = useState<number>(0);


    const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDTO | ResponseDto | null)=> {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const { favoriteList } = responseBody as GetFavoriteListResponseDTO;
      setFavoriteList(favoriteList);
      if(!loginUser) {
        setShowFavorite(false);
        return;
      }
      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !==-1;
      setFavorite(isFavorite);
    }
    const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto | null) =>{
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') return;

      const { commentList } = responseBody as GetCommentListResponseDto;
      setTotalList(commentList);
      setTotalCommentCount(commentList.length);
      }
      const putFavoriteResponse = (responseBody: PutFavoriteResponseDto | ResponseDto | null) =>{
      if(!responseBody) return;
        const { code } = responseBody;
        if(code === 'VF') alert('잘못된 접근입니다.');
        if(code === 'NU') alert('존재하지 않는 유저입니다.');
        if(code === 'NB') alert('존재하지 않는 게시물입니다.');
        if(code === 'AF') alert('인증에 실패했습니다.');
        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code !== 'SU') return;

        if(!boardNumber) return;
        getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);

      }
      const postCommentResponse = (responseBody: PostCommentResponseDto | ResponseDto | null) =>{
        if(!responseBody) return;
        const { code } = responseBody;
        if(code === 'VF') alert('잘못된 접근입니다.');
        if(code === 'NU') alert('존재하지 않는 유저입니다.');
        if(code === 'NB') alert('존재하지 않는 게시물입니다.');
        if(code === 'AF') alert('인증에 실패했습니다.');
        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code !== 'SU') return;

        setComment('');
        if(!boardNumber) return;
        getCommentListRequest(boardNumber).then(getCommentListResponse);

      }

    const isMounted = useRef(false);

    const onFavoriteClick = () => {
      if (!loginUser || !cookies.accessToken) {
        alert('로그인이 필요합니다.');
        return;
      }
      if (!boardNumber) return;
      setFavorite(!isFavorite);
      putFavoriteRequest(boardNumber, cookies.accessToken).then(putFavoriteResponse);
    };
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
      if(!comment || !boardNumber || !loginUser || !cookies.accessToken) return;
      const requestBody: PostCommentRequestDto = {content:comment};
      postCommentRequest(boardNumber,requestBody,cookies.accessToken).then(postCommentResponse);

    }

    useEffect(() => {
      if(!boardNumber) return;
      getFavoriteListRequest(boardNumber).then(getFavoriteListResponse)
      getCommentListRequest(boardNumber).then(getCommentListResponse)
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
              <div className='board-detail-bottom-button-text'>{`comment ${totalCommentCount}`}</div>
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
                  <div className='board-detail-bottom-comment-title'>{'comment '}<span className='emphasis'>{totalCommentCount}</span></div>
                  <div className='board-detail-bottom-comment-list-container'>
                    {viewList.map(item => <CommentItem commentListItem={item} />)}
                  </div>
                </div>

                <div className='divider'></div>
                <div className='board-detail-bottom-comment-pagination-box'>
                  <Pagination
                  currentPage={currentPage}
                  currentSection={currentSection}
                  setCurrentSection={setCurrentSection}
                  setCurrentPage={setCurrentPage}
                  viewPageList={viewPageList}
                  totalSection={totalSection}
                  />
                </div>
                {loginUser !== null &&
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
                }
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