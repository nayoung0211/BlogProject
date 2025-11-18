package com.nana.boardback.controller;

import com.nana.boardback.dto.request.user.PatchNicknameRequestDto;
import com.nana.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.nana.boardback.dto.response.user.GetSignInUserResponseDto;
import com.nana.boardback.dto.response.user.GetUserResponseDto;
import com.nana.boardback.dto.response.user.PatchNicknameResponseDto;
import com.nana.boardback.dto.response.user.PatchProfileImageResponseDto;
import com.nana.boardback.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(
        @AuthenticationPrincipal String email){
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignUser(email);
        return response;
    }
    @GetMapping("{email}")
    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable("email") String email){
        ResponseEntity<? super GetUserResponseDto> response = userService.getUser(email);
        return response;
    }
    @PatchMapping("/nickname")
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(
        @RequestBody @Valid PatchNicknameRequestDto dto,
        @AuthenticationPrincipal String email
    ){
        ResponseEntity<? super PatchNicknameResponseDto> response = userService.patchNickname(dto, email);
        return response;
    }
    @PatchMapping("/profile-image")
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(
        @RequestBody @Valid PatchProfileImageRequestDto dto,
        @AuthenticationPrincipal String email
    ){
        ResponseEntity<? super PatchProfileImageResponseDto> response = userService.patchProfileImage(dto, email);
        return response;

    }
}
