import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import './style.css';
import useBoardStore from "../../../stores/board.store";
import {useLoginUserStore} from "../../../stores";
import {useNavigate, useParams} from "react-router-dom";
import {MAIN_PATH} from "../../../constants";
import {useCookies} from "react-cookie";
import {getBoardRequest} from "../../../apis";
import {GetBoardResponseDTO} from "../../../apis/response/board";
import ResponseDto from "../../../apis/response/response.dto";
import {convertUrlsToFile} from "../../../utils";

export default function BoardWrite() {

  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const {boardNumber} = useParams();

  const {title,setTitle,content,setContent,boardImageFileList,setBoardImageFileList} = useBoardStore();
  const [cookies] =  useCookies(['accessToken']);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {loginUser} = useLoginUserStore();

  const navigate = useNavigate();

  // 게시물 데이터 불러오기 응답 처리
  const getBoardResponse = (responseBody: GetBoardResponseDTO | ResponseDto| null) =>{
    if(!responseBody) return;
    const {code} = responseBody;
    if(code === 'NB') alert('존재하지 않는 게시물입니다.');
    if(code === 'DBE') alert('데이터베이스 오류입니다.');
    if(code !=='SU') {
      navigate(MAIN_PATH());
      return;
    }
    const { title,content,boardImageList,writerEmail} = responseBody as GetBoardResponseDTO;
    setTitle(title);
    setContent(content);
    setImageUrls(boardImageList);
    convertUrlsToFile(boardImageList).then(boardImageFileList => setBoardImageFileList(boardImageFileList));

    if(!loginUser || loginUser?.email !== writerEmail){
      navigate(MAIN_PATH());
      return;
    }
    if(!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  }

  // 입력값 변경
  const onTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>{
    const {value} = event.target;
    setTitle(value);
    if(!titleRef.current) return;
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  }
  const onContentChange= (event: ChangeEvent<HTMLTextAreaElement>) =>{
    const {value} = event.target;
    setContent(value);
    if(!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  }

  // 이미지 업로드 버튼 클릭
  const onImageButtonClick = () =>{
    if(!imageInputRef.current) return;
    imageInputRef.current.click();
  }
  // 이미지 파일 변경
  const onImageChange = (event: ChangeEvent<HTMLInputElement>)=>{
    if(!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = [...imageUrls, imageUrl];
    setImageUrls(newImageUrls);

    const newBoardImageFileList = [...boardImageFileList, file];
    setBoardImageFileList(newBoardImageFileList);
  }
  // 이미지 닫기 버튼 클릭
  const onCloseButtonClick = (deleteIndex: number) => {
    if(!imageInputRef.current) return;
    imageInputRef.current.value = "";

    const newImageUrls = imageUrls.filter((_,index) => index !== deleteIndex);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter((_,index) => index !== deleteIndex);
    setBoardImageFileList(newBoardImageFileList);
  }

  // 컴포넌트 마운트 시 게시물 데이터 불러오기
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if(!accessToken){
      navigate(MAIN_PATH());
      return;
    }
    if(!boardNumber) return;
    getBoardRequest(boardNumber).then(getBoardResponse)
  }, [boardNumber]);

  return (
      <div id='board-update-wrapper'>
        <div className='board-update-container'>
          <div className='board-update-box'>
            <div className='board-update-title-box'>
              <textarea ref={titleRef} className='board-update-title-textarea' rows={1} placeholder='Please enter a title.' value={title} onChange={onTitleChange}/>
            </div>
            <div className='divider'></div>
            <div className='board-update-content-box'>
              <textarea ref={contentRef} className='board-update-content-textarea' placeholder='Please enter the content.' value={content} onChange={onContentChange}/>
              <div className='icon-button' onClick={onImageButtonClick}>
                <div className='icon image-box-light-icon'></div>
              </div>
              <input ref={imageInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageChange}/>
            </div>
            <div className='board-update-images-box'>
              {imageUrls.map((imageUrl,index) => (
                  <div className='board-update-image-box' key={index}>
                    <img
                        className='board-update-image'
                        src={imageUrl}
                    />
                    <div className='icon-button image-close' onClick={()=>onCloseButtonClick(index)}>
                      <div className='icon close-icon'></div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}