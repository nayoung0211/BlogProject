import React, {useRef} from "react";
import './style.css';


export default function BoardWrite() {

  const contentRef = useRef<HTMLDivElement | null>(null);


  return (
      <div id='board-write-wrapper'>
        <div className='board-write-container'>
          <div className='board-write-box'>
            <div className='board-write-title-box'>
              <input className='board-write-title-input' type='text' placeholder='Please enter a title.' />
            </div>
            <div className='divider'></div>
            <div className='board-write-content-box'>
              <textarea className='board-write-content-textarea' placeholder='Please enter the content.'/>
              <div className='icon-button'>
                <div className='icon image-box-light-icon'></div>
              </div>
              <input type='file' accept='image/*' style={{display: 'none'}} />
            </div>
            <div className='board-write-images-box'>
              <div className='board-write-image-box'>
                <img className='board-write-image'/>
                <div className='icon-button image-close'>
                  <div className='icon close-icon'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}