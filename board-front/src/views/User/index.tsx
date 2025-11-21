import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png'
import {useNavigate, useParams} from "react-router-dom";
import {BoardListItem} from "../../types/interface";
import {latestBoardListMock} from "../../mocks";
import BoardItem from "../../components/BoardItem";
import {BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH} from "../../constants";
import {useLoginUserStore} from "../../stores";
import {
  fileUploadRequest, getUserBoardListRequest,
  getUserRequest,
  patchNicknameRequest,
  patchProfileImageRequest
} from "../../apis";
import {
  GetUserResponseDto,
  PatchNicknameResponseDto,
  PatchProfileImageResponseDto
} from "../../apis/response/user";
import ResponseDto from "../../apis/response/response.dto";
import {PatchNicknameRequestDTO, PatchProfileImageRequestDto} from "../../apis/request/user";
import {useCookies} from "react-cookie";
import {usePagination} from "../../hooks";
import {GetUserBoardListResponseDTO} from "../../apis/response/board";
import Pagination from "../../components/Pagination";
import CropImageModal from "../../components/crop";

export default function User() {

  const { userEmail } = useParams();
  const { loginUser } = useLoginUserStore();
  const [isMyPage,setMyPage] = useState<boolean>(false);
  const [cookies,setCookie] = useCookies();

  const navigate = useNavigate();

  // --------------------------------------------
  //                UserTop
  // --------------------------------------------
  const UserTop = () =>{
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [isNicknameChange,setNicknameChange] = useState<boolean>(false);
    const [nickname,setNickname] = useState<string>('');
    const [changeNickname,setChangeNickname] = useState<string>('');
    const [profileImage,setProfileImage] = useState<string | null>(null);

    // ⭐ 크롭 이미지 모달
    const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

    const fileUploadResponse = (profileImage: string | null) =>{
      if(!profileImage) return;
      if(!cookies.accessToken) return;

      const requestBody: PatchProfileImageRequestDto = {profileImage}
      patchProfileImageRequest(requestBody,cookies.accessToken).then(patchProfileImageResponse);
    }

    const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null)=>{
      if(!responseBody) return;
      const { code } = responseBody;
      if (code === 'AF') alert('인증 실패');
      if (code === 'NU') alert('존재하지 않는 유저');
      if (code === 'DBE') alert('DB 오류');
      if (code !== 'SU')  return;

      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    }

    const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null)=>{
      if(!responseBody) return;
      const { code } = responseBody;
      if (code === 'DN') alert('닉네임 중복');
      if (code !== 'SU')  return;

      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
      setNicknameChange(false);
    }

    const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) =>{
      if(!responseBody) return;

      const { code } = responseBody;
      if (code !== 'SU'){
        navigate(MAIN_PATH());
        return;
      }

      const {email,nickname,profileImage} = responseBody as GetUserResponseDto;

      setNickname(nickname);
      setProfileImage(profileImage);

      const isMyPage = email === loginUser?.email;
      setMyPage(isMyPage);
    };


    // --------------------------------------
    //            프로필 이미지 변경
    // --------------------------------------
    const onProfileBoxClick = () =>{
      if(!isMyPage) return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click();
    };

    const onProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // ⭐ 크롭 모달 띄움
        setCropImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    };

    // ⭐ 크롭 완료
    const onCropComplete = async (blob: Blob) => {
      const formData = new FormData();
      formData.append("file", blob, "profile.png");

      fileUploadRequest(formData).then(fileUploadResponse);

      setCropImageSrc(null); // 모달 닫기
    };


    // --------------------------------------
    //            닉네임 변경
    // --------------------------------------
    const onNicknameEditButtonClick = () =>{
      if(!isNicknameChange){
        setChangeNickname(nickname);
        setNicknameChange(true);
        return;
      }

      if(isNicknameChange){
        if(!cookies.accessToken) return;

        const requestBody: PatchNicknameRequestDTO ={
          nickname: changeNickname
        };
        patchNicknameRequest(requestBody,cookies.accessToken).then(patchNicknameResponse);
      }
    };

    const onNicknameChange = (event: ChangeEvent<HTMLInputElement>) =>{
      setChangeNickname(event.target.value);
    };

    // --------------------------------------
    useEffect(() => {
      if(!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse)
    },[userEmail]);


    return (
        <>
          {/* ⭐ 크롭 모달 */}
          {cropImageSrc && (
              <CropImageModal
                  image={cropImageSrc}
                  onCancel={() => setCropImageSrc(null)}
                  onComplete={onCropComplete}
              />
          )}

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
                      </>
                      :
                      <div className='user-top-info-nickname'>{nickname}</div>
                  }
                </div>
                <div className='user-top-info-email'>{userEmail}</div>
              </div>
            </div>
          </div>
        </>
    );
  };


  // --------------------------------------------
  //                UserBottom
  // --------------------------------------------
  const UserBottom = () =>{
    const {
      currentPage,setCurrentPage,currentSection,setCurrentSection,viewList,viewPageList,totalSection,setTotalList
    } = usePagination<BoardListItem>(5);

    const [count,setCount] = useState<number>(2);

    const getUserBoardListResponse = (responseBody: GetUserBoardListResponseDTO | ResponseDto | null) =>{
      if(!responseBody) return;

      const { code } = responseBody;
      if (code === 'NU') {
        alert('존재하지 않는 유저입니다.');
        navigate(MAIN_PATH());
        return;
      }
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code !== 'SU') return;

      const { userBoardList } = responseBody as GetUserBoardListResponseDTO;

      setTotalList(userBoardList);
      setCount(userBoardList.length);
    };

    const onSideCardClick = () =>{
      if(isMyPage) navigate(BOARD_PATH()+'/'+BOARD_WRITE_PATH());
      else if(loginUser){
        navigate(USER_PATH(loginUser.email));
      }
    };

    useEffect(() => {
      if(!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    }, [userEmail]);

    return (
        <div id='user-bottom-wrapper'>
          <div className='user-bottom-container'>
            <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
            <div className='user-bottom-contents-box'>
              {count === 0?
                  <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> :
                  <div className='user-bottom-contents'>
                    {viewList.map(item=><BoardItem boardListItem = {item}/>)}
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
                        </> :
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
            <div className='user-bottom-pagination-box'>
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
    );
  };

  return (
      <>
        <UserTop/>
        <UserBottom/>
      </>
  )
}
