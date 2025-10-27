import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import axios from "axios";
import ResponseDto from "./response/response.dto";
import {SignInResponseDto, SignUpResponseDto} from "./response/auth";
import {GetSignInUserResponseDto} from "./response/user";

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const authorization = (accessToken: string) =>{
  return {headers:{Authorization: `Bearer ${accessToken}`}}
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) =>{
  const result = await axios.post(SIGN_IN_URL(), requestBody)
  .then(response => {
    const responseBody: SignInRequestDto = response.data;
    return responseBody;
  })
  .catch(error => {
    if(!error.response.data) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })
  return result;
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
  };

}