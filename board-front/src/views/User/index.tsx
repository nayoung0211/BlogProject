import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png'
import {useNavigate, useParams} from "react-router-dom";
import {BoardListItem} from "../../types/interface";
import {latestBoardListMock} from "../../mocks";
import BoardItem from "../../components/BoardItem";
import {BOARD_PATH, BOARD_WRITE_PATH, USER_PATH} from "../../constants";
import {useLoginUserStore} from "../../stores";

export default function User() {

  const { userEmail } = useParams();
  //로그인 유저 상태
  const { loginUser } = useLoginUserStore();
  const [isMyPage,setMyPage] = useState<boolean>(false);

  const navigate = useNavigate();

  //상단 컴포넌트
  const UserTop = () =>{
    //이미지 파일 인풋 참조 상태
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    //닉네임 변경 여부 상태
    const [isNicknameChange,setNicknameChange] = useState<boolean>(false);

    const [nickname,setNickname] = useState<string>('');

    const [changeNickname,setChangeNickname] = useState<string>('');

    const [profileImage,setProfileImage] = useState<string | null>(null);

    const onProfileBoxClick = () =>{
      if(!isMyPage) return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    }

    const onNicknameEditButtonClick = () =>{
      setChangeNickname(nickname);
      setNicknameChange(!isNicknameChange);
    }
    const onProfileImageChange = (event: ChangeEvent<HTMLInputElement>) =>{
      if(!event.target.files || !event.target.files.length) return;
      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    };
    //닉네임 변경
    const onNicknameChange = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setChangeNickname(value);
    }
    //email path variable 변경시 실행할 함수
    useEffect(() => {

      if(!userEmail) return;
      setNickname('nana');
      setProfileImage(defaultProfileImage);
    },[userEmail]);


    //상단 컴포넌트
    return (
        <div id='user-top-wrapper'>
          <div className='user-top-container'>
            {isMyPage ?
                <div className='user-top-my-profile-image-box' onClick={onProfileBoxClick}>
                  {profileImage !== null ?
                  <div className='user-top-profile-image' style={{backgroundImage : `url(${profileImage})`}}></div> :
                        <div className='icon-box-large'>
                          <div className='icon image-box-white-icon'></div>
                        </div>
                  }
                  <input ref={imageInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onProfileImageChange}/>
                </div> :
                <div className='user-top-profile-image-box' style={{backgroundImage : `url(${profileImage})`}}></div>
            }
            <div className='user-top-info-box'>
              <div className='user-top-info-nickname-box'>
                {isMyPage ?
                <>
                {isNicknameChange ?
                    <input className='user-top-info-nickname-input' type='text' size={nickname.length+2} value={changeNickname} onChange={onNicknameChange}/> :
                    <div className='user-top-info-nickname'>{nickname}</div>
                }
                <div className='icon-button' onClick={onNicknameEditButtonClick}>
                  <div className='icon edit-icon'></div>
                </div>
                </>:
                    <div className='user-top-info-nickname'>{nickname}</div>
                }
              </div>
              <div className='user-top-info-email'>{'email@email.com'}</div>
            </div>
          </div>
        </div>
    );
  };

  //하단 컴포넌트
  const UserBottom = () =>{

    const [count,setCount] = useState<number>(2);
    const [userBoardList,setUserBoardList] = useState<BoardListItem[]>([]);

    const onSideCardClick = () =>{
      if(isMyPage) navigate(BOARD_PATH()+'/'+BOARD_WRITE_PATH());
      else if(loginUser){
        navigate(USER_PATH(loginUser.email));
      }
    }

    useEffect(() => {
      setUserBoardList(latestBoardListMock);
    }, [userEmail]);

    //하단 컴포넌트
    return (
        <div id='user-bottom-wrapper'>
          <div className='user-bottom-container'>
            <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
            <div className='user-bottom-contents-box'>
              {count === 0?
                  <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> :
                  <div className='user-bottom-contents'>
                    {userBoardList.map(item=><BoardItem boardListItem = {item}/>)}
                  </div>
              }
              <div className='user-bottom-side-box'>
                <div className='user-bottom-side-card' onClick={onSideCardClick}>
                  <div className='user-bottom-side-container'>
                    {isMyPage ?
                        <>
                    <div className='icon-box'>
                      <div className='icon edit-icon'></div>
                    </div>
                        <div className='user-bottom-side-text'>{'글쓰기'}</div>
                    </>:
                        <>
                          <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                          <div className='icon-box'>
                            <div className='icon arrow-right-icon'></div>
                          </div>
                        </>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='user-bottom-pagination-box'></div>
          </div>
        </div>
    );
  };

  return (
     <>
     <UserTop/>
       <UserBottom/>
     </>
  )
}