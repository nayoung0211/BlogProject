import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import axios from "axios";
import ResponseDto from "./response/response.dto";
import {SignInResponseDto, SignUpResponseDto} from "./response/auth";
import {GetSignInUserResponseDto} from "./response/user";
import {PostBoardRequestDTO} from "./request/board";
import {GetBoardResponseDTO, PostBoardResponseDTO} from "./response/board";
import IncreaseViewCountResponseDto from "./response/board/increase-view-count.response.dto";

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
const POST_BOARD_URL = () =>`${API_DOMAIN}/board`;

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
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
  try {
    const response = await axios.get(
        GET_SIGN_IN_USER_URL(),
        authorization(accessToken)
    );

    // 정상 응답일 때
    const responseBody: GetSignInUserResponseDto = response.data;
    return responseBody;

  } catch (error: any) {
    // 에러 응답이 아예 없는 경우 (네트워크 문제 등)
    if (!error.response) {
      console.error('Network or CORS error:', error);
      return null;
    }

    // 에러 응답이 있지만 .data가 없는 경우
    if (!error.response.data) {
      console.error('No response body:', error.response);
      return null;
    }

    // 서버에서 ResponseDto 형태의 응답을 보낸 경우
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