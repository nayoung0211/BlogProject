import React from "react";
import './style.css';

export default function Footer(){
  const onInstaIconButtonClickHandler = () => {
    window.open("https://www.instagram.com");
  };

  const onNaverBlogIconButtonClickHandler = () => {
    window.open("https://section.blog.naver.com/");
  };

  return (
      <div id='footer'>
        <div className='footer-container'>
          <div className='footer-top'>
            <div className='footer-logo-box'>
              <div className='icon-box'>
                <div className='icon logo-light-icon'></div>
              </div>
              <div className='footer-logo-text'>{`NaWoong's Board`}</div>
            </div>
            <div className='footer-link-box'>
              <div className='footer-email-link'>{`nanawoongwoongho@onepiece.com`}</div>
              <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                <div className='icon insta-icon'></div>
              </div>
              <div className='icon-button' onClick={onNaverBlogIconButtonClickHandler}>
                <div className='icon naver-blog-icon'></div>
              </div>
            </div>
          </div>
          <div className='footer-bottom'>
            <div className='footer-copyright'>{`Copyright © 2025 Nana Company. All rights reserved.`}</div>
          </div>
        </div>
      </div>
  )
}