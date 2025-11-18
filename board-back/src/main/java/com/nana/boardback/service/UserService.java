package com.nana.boardback.service;

import com.nana.boardback.dto.request.user.PatchNicknameRequestDto;
import com.nana.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.nana.boardback.dto.response.user.GetUserResponseDto;
import com.nana.boardback.dto.response.user.PatchNicknameResponseDto;
import com.nana.boardback.dto.response.user.PatchProfileImageResponseDto;
import org.springframework.http.ResponseEntity;
import com.nana.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {

    ResponseEntity<? super GetUserResponseDto> getUser(String email);
    ResponseEntity<? super GetSignInUserResponseDto> getSignUser(String email);
    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(
        PatchNicknameRequestDto dto,String email);
    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(
        PatchProfileImageRequestDto dto,String email);
}
