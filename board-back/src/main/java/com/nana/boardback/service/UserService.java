package com.nana.boardback.service;

import org.springframework.http.ResponseEntity;
import com.nana.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {

    ResponseEntity<? super GetSignInUserResponseDto> getSignUser(String email);
}
