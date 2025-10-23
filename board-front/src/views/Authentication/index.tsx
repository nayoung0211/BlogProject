import React, {useState, KeyboardEvent, useRef, ChangeEvent} from "react";
import './style.css';
import InputBox from "../../components/InputBox";
import {SignInRequestDto} from "../../apis/request/auth";
import ResponseDto from "../../apis/response/response.dto";
import {signInRequest} from "../../apis";
import {SignInResponseDto} from "../../apis/response/auth";
import {useCookies} from "react-cookie";
import {MAIN_PATH} from "../../constants";
import {useNavigate} from "react-router-dom";


export default function Authentication() {
  const [view,setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [cookies,setCookie] = useCookies();
  const navigator = useNavigate();

  const SignInCard = () =>{
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordType,setPasswordType] = useState<'text' | 'password'>('password');
    const [passwordIcon,setPasswordIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    const [error,setError] = useState<boolean>(false);

    const signInResponse = (responseBody: SignInRequestDto | ResponseDto | null) => {
      if (!responseBody) {
        alert('network error');
        return;
      }
      if ('code' in responseBody) {
        const {code} = responseBody;
        if (code === 'DBE') alert('database error');
        if (code === 'SF' || code === 'VF') setError(true);
        if (code !== 'SU') return;
      }
      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      setCookie('accessToken',token,{expires ,path : MAIN_PATH()});
      navigator(MAIN_PATH());
    }
    const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
      setError(false);
      const value = event.target.value;
      setEmail(value);
    }
    const onPasswordChangeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
      setError(false);
      const value = event.target.value;
      setPassword(value);
    }


    const onSignInButtonClick = () =>{
      if (!email || !password) {
        setError(true);
        return;
      }
      const requestBody : SignInRequestDto = {email,password};
      signInRequest(requestBody).then(signInResponse);
    }
    const onSignUpButtonClick = () =>{
      setView('sign-up');
    }
    const onPasswordButtonClickHandler = () =>{
      if(passwordType === 'text'){
        setPasswordType('password');
        setPasswordIcon('eye-light-off-icon');
      }else{
        setPasswordType('text');
        setPasswordIcon('eye-light-on-icon');
      }
    }

    const onEmailKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }
    const onPasswordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      onSignInButtonClick();
    }

    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Login'}</div>
            </div>
            <InputBox ref={emailRef} label='Email' type='text' placeholder='Enter your email address' error={error}
                      value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='Enter your password' error={error}
                      value={password} onChange={onPasswordChangeHandler} icon={passwordIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error &&
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'The email address or password you entered is incorrect.\n' +
                    'Please check and try again.'}
              </div>
            </div>}
            <div className='black-large-full-button' onClick={onSignInButtonClick}>{'Login'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{"Don't have an account yet?"}<span className='auth-description-link' onClick={onSignUpButtonClick}>{'Sign Up'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SignUpCard = () =>{

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);


    const [page,setPage] = useState<1|2>(1);
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordCheck,setPasswordCheck] = useState<string>('');
    const [passwordType,setPasswordType] = useState<'text'|'password'>('password');
    const [passwordCheckType,setPasswordCheckType] = useState<'text'|'password'>('password');
    const [isEmailError,setEmailError] = useState<boolean>(false);
    const [isPasswordError,setPasswordError] = useState<boolean>(false);
    const [isPasswordCheckError,setPasswordCheckError] = useState<boolean>(false);
    const [emailErrorMessage,setEmailErrorMessage] = useState<string>('');
    const [passwordErrorMessage,setPasswordErrorMessage] = useState<string>('');
    const [passwordCheckErrorMessage,setPasswordCheckErrorMessage] = useState<string>('');
    const [passwordIcon,setPasswordIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    const [passwordCheckButtonIcon,setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

    const onEmailChange = (event:ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setEmail(value);
    }
    const onPasswordChange = (event:ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setPassword(value);
    }
    const onPasswordCheckChange = (event:ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setPasswordCheck(value);
    }
    const onPasswordButtonClick = () =>{
      if(passwordIcon === 'eye-light-off-icon'){
        setPasswordIcon('eye-light-on-icon');
        setPasswordType('text');
      }else{
        setPasswordIcon('eye-light-off-icon');
        setPasswordType('password');
      }
    }
    const onPasswordCheckButtonClick = () =>{
      if(passwordIcon === 'eye-light-off-icon'){
        setPasswordIcon('eye-light-on-icon');
        setPasswordType('text');
      }else{
        setPasswordIcon('eye-light-off-icon');
        setPasswordType('password');
      }
    }
    const onEmailKeyDown = (event:KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }
    const onPasswordKeyDown = (event:KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }
    const onPasswordCheckKeyDown = (event:KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      onNextButtonClick();
    }
    const onNextButtonClick = () =>{
      const emailPattern = /^[a-zA-z0-9]*@([-.]?[a-zA-z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if(!isEmailPattern){
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address');
      }
      const isCheckPassword = password.trim().length >= 8;
      if(!isCheckPassword){
        setPasswordError(true);
        setPasswordErrorMessage('Please enter a password of at least 8 characters.');
      }
      const isEqualPassword = password === passwordCheck;
      if(!isEqualPassword){
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('Passwords do not match.');
      }
      if(!isEqualPassword || !isEmailPattern || !isCheckPassword) return;
      setPage(2);
    }


    return (
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'Sign Up'}</div>
                <div className='auth-card-page'>{`${page}/2`}</div>
              </div>
              <InputBox ref={emailRef} label='Email address' type='text' placeholder='Enter the email'
                        value={email} onChange={onEmailChange} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDown}/>
              <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='Enter the password'
                        value={password} onChange={onPasswordChange} error={isPasswordError} message={passwordErrorMessage} icon={passwordIcon} onButtonClick={onPasswordButtonClick} onKeyDown={onPasswordKeyDown}/>
              <InputBox ref={passwordCheckRef} label='Password Check' type={passwordCheckType}
                        placeholder='Enter the password again' value={passwordCheck} onChange={onPasswordCheckChange}
                        error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClick} onKeyDown={onPasswordCheckKeyDown}/>
            </div>
              <div className='auth-card-bottom'>
                <div className='black-large-full-button' onClick={onNextButtonClick}>{'Next'}</div>
                <div className='auth-description-box'>
                  <div className='auth-description'>{'Already have an account?'}<span className='auth-description-lick'>{'Login'}</span></div>
                </div>
              </div>
          </div>
        </div>
    );
  };

  return (
      <div id='auth-wrapper'>
        <div id='auth-container'>
          <div className='auth-jumbotron-box'>
            <div className='auth-jumbotron-contents'>
              <div className='auth-logo-icon'></div>
              <div className='auth-jumbotron-text-box'>
                <div className='auth-jumbotron-text'>{`Welcome.`}</div>
                <div className='auth-jumbotron-text'>{`This is NaWoong Board.`}</div>
              </div>
            </div>
          </div>
          {view==='sign-in' && <SignInCard/>}
          {view==='sign-up' && <SignUpCard/>}
        </div>
      </div>
  )
}