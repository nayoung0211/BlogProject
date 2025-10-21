import React, {ChangeEvent, Dispatch, forwardRef, SetStateAction,KeyboardEvent} from "react";
import './style.css'

interface Props {
  label: string;
  type:'text' | 'password';
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error:boolean;

  icon?:'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
  onButtonClick?: () => void;
  message?:string;

  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = forwardRef<HTMLInputElement,Props>((props:Props,ref)=>{
  const {label, type,error,placeholder,value,setValue,icon,onButtonClick,message,onKeyDown} = props;

  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
    const value= event.target.value;
    setValue(value);
  }
  const onKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>)=>{
    if(!onKeyDown) return;
    onKeyDown(event);
  };

  return (
      <div className="inputbox">
        <div className="inputbox-label">{label}</div>
        <div className={error ? 'inputbox-container-error':'inputbox-container'}>
          <input ref={ref} className="input" type={type} placeholder={placeholder} value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
          {onButtonClick !== undefined && (
              <div className="icon-button" onClick={onButtonClick}>
                {icon !== undefined &&(
                    <div className={`icon ${icon}`}></div>
                )}
              </div>
          )}
        </div>
        {message !== undefined && (
            <div className="inputbox-message">{message}</div>
        )}
      </div>
  )
});

export default InputBox;