import React, {useEffect, useState} from "react";
import './style.css';
import {User} from "../../types/interface";
import defaultProfileImage from 'assets/image/default-profile-image.png'
import {useParams} from "react-router-dom";

export default function UserPage() {

  //마이페이지 여부 상태
  const [isMyPage,setMyPage] = useState<boolean>(true);
  //user 정보 상태
  const [user,setUser] = useState<User | null>(null);

  const { userEmail } = useParams();

  //email path variable 변경시 실행할 함수
  useEffect(() => {
    if(!userEmail) return;
    setUser({email: 'email@email.com',nickname: '나영',profileImage:defaultProfileImage})
  },[userEmail]);

  //상단 컴포넌트
  if(!user) return (<></>);
  const UserTop = () =>{
    //상단 컴포넌트
    return (
        <div id='user-top-wrapper'>
          <div className='user-top-container'>
            {isMyPage ?
                <div className='user-top-my-profile-image-box'>
                  <div className='user-top-profile-image' style={{backgroundImage : `url(${user.profileImage ? user.profileImage : defaultProfileImage})`}}></div>
                  <input ref={} type='file' accept='image/*' style={{display: 'none'}}/>
                </div> :
                <div className='user-top-profile-image-box' style={{backgroundImage : `url(${user.profileImage ? user.profileImage : defaultProfileImage})`}}></div>
            }
            <div className='user-top-info-box'>
              <div className='user-top-info-nickname-box'>
                {isMyPage ?
                <>
                <div className='user-top-info-nickname'>{'나영'}</div>
                <div className='icon-button'>
                  <div className='icon edit-icon'></div>
                </div>
                </>:
                    <div className='user-top-info-nickname'>{'나영'}</div>
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
    //하단 컴포넌트
    return (
        <div></div>
    );
  };


  return (
     <>
     <UserTop/>
       <UserBottom/>
     </>
  )
}