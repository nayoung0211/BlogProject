import React, {useState, KeyboardEvent, useRef} from "react";
import './style.css';
import InputBox from "../../components/InputBox";


export default function Authentication() {
  const [view,setView] = useState<'sign-in' | 'sign-up'>('sign-in');


  const SignInCard = () =>{
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordType,setPasswordType] = useState<'text' | 'password'>('password');
    const [passwordIcon,setPasswordIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    const [error,setError] = useState<boolean>(false);
    const onSignInButtonClick = () =>{

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
                      value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='Password' type='password' placeholder='Enter your password' error={error}
                      value={password} setValue={setPassword} icon={passwordIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
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
    return (
        <div className='auth-card'></div>
    );
  };

  return (
      <div id='auth-wrapper'>
        <div id='auth-container'>
          <div className='auth-jumbotron-box'>
            <div className='auth-jumbotron-contents'>
              <div className='auth-logo-icon'></div>
              <div className='auth-jumbotron-text-box'>
                <div className='auth-jumbotron-text'>{`환영합니다.`}</div>
                <div className='auth-jumbotron-text'>{`NaWoong Board입니다.`}</div>
              </div>
            </div>
          </div>
          {view==='sign-in' && <SignInCard/>}
          {view==='sign-up' && <SignUpCard/>}
        </div>
      </div>
  )
}