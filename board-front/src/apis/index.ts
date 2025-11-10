import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import axios from "axios";
import ResponseDto from "./response/response.dto";
import {SignInResponseDto, SignUpResponseDto} from "./response/auth";
import {GetSignInUserResponseDto} from "./response/user";
import {PostBoardRequestDTO, PostCommentRequestDto} from "./request/board";
import {
  DeleteBoardResponseDto,
  GetBoardResponseDTO, GetCommentListResponseDto,
  GetFavoriteListResponseDTO,
  PostBoardResponseDTO
} from "./response/board";
import IncreaseViewCountResponseDto from "./response/board/increase-view-count.response.dto";
import {FavoriteListItem} from "../types/interface";
import PostCommentResponseDto from "./response/board/post-comment.response.dto";

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const authorization = (accessToken: string) =>{
  return {headers:{Authorization: `Bearer ${accessToken}`}}
};


const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto): Promise<SignInResponseDto | ResponseDto | null> => {
  try {
    const response = await axios.post(SIGN_IN_URL(), requestBody);
    const responseBody: SignInResponseDto = response.data;
    return responseBody;
  } catch (error: any) {
    if (!error.response) {
      console.error('Network error or CORS issue', error);
      return null;
    }

    if (!error.response.data) {
      console.error('No response data', error.response);
      return null;
    }

    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  }
}

export const signUpRequest = async (requestBody: SignUpRequestDto) =>{
  const result  = await axios.post(SIGN_UP_URL(), requestBody)
  .then(response => {
    const responseBody: SignUpResponseDto = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response.data) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}
const GET_BOARD_URL = (boardNumber: number | string)=>`${API_DOMAIN}/board/${boardNumber}`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const POST_BOARD_URL = () =>`${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number | string)  => `${API_DOMAIN}/board/${boardNumber}/comment`;
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

export const getBoardRequest = async (boardNumber: number | string)=>{
  const result = await axios.get(GET_BOARD_URL(boardNumber))
  .then(response=>{
    const responseBody: GetBoardResponseDTO = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}
export const increaseViewCountRequest = async (boardNumber: number | string)=>{
  const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
  .then(response=>{
    const responseBody: IncreaseViewCountResponseDto = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
}

export const getFavoriteListRequest = async (boardNumber: number | string)=>{
  const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
  .then(response =>{
    const responseBody: GetFavoriteListResponseDTO = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getCommentListRequest = async (boardNumber: number | string)=>{
  const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
  .then(response =>{
    const responseBody: GetCommentListResponseDto = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
}


export const postBoardRequest = async (requestBody: PostBoardRequestDTO, accessToken: string) =>{
  const result = await axios.post(POST_BOARD_URL(), requestBody,authorization(accessToken))
  .then(response => {
    const responseBody: PostBoardResponseDTO = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
}
export const postCommentRequest = async (boardNumber: number | string, requestBody: PostCommentRequestDto, accessToken: string) => {
  const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
  .then(response => {
    const responseBody : PostCommentResponseDto = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
}



export const putFavoriteRequest = async (boardNumber: number | string,accessToken: string) =>{
  const result = await axios.put(PUT_FAVORITE_URL(boardNumber),{},authorization(accessToken))
  .then(response => {
    const responseBody: PostBoardResponseDTO = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
}

export const deleteBoardsRequest = async(boardNumber: number | string,accessToken:string) =>{
  const result = await axios.delete(DELETE_BOARD_URL(boardNumber),authorization(accessToken))
  .then(response => {
    const responseBody: DeleteBoardResponseDto = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
}



const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
  try {
    const response = await axios.get(
        GET_SIGN_IN_USER_URL(),
        authorization(accessToken)
    );

    const responseBody: GetSignInUserResponseDto = response.data;
    return responseBody;

  } catch (error: any) {
    if (!error.response) {
      console.error('Network or CORS error:', error);
      return null;
    }

    if (!error.response.data) {
      console.error('No response body:', error.response);
      return null;
    }
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  }
}

const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL = () =>`${FILE_DOMAIN}/upload`;
const multipartFormData = {headers:{'Content-Type': 'multipart/form-data'}}
export const fileUploadRequest = async (data: FormData) =>{
  const result = await axios.post(FILE_UPLOAD_URL(), data,multipartFormData)
  .then(response => {
    const responseBody: string = response.data;
    return responseBody;
  })
  .catch(error => {
    return null;
  })
  return result;
}