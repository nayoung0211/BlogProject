package com.nana.boardback.service;

import com.nana.boardback.dto.request.auth.SignInRequestDto;
import com.nana.boardback.dto.request.auth.SignUpRequestDto;
import com.nana.boardback.dto.response.auth.SignInResponseDto;
import com.nana.boardback.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
