package com.nana.boardback.service.implement;

import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.dto.response.user.GetSignInUserResponseDto;
import com.nana.boardback.entity.UserEntity;
import com.nana.boardback.repository.UserRepository;
import com.nana.boardback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {
    private final UserRepository userRepository;


    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignUser(String email) {

        UserEntity userEntity = null;
        try{
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null){
                return GetSignInUserResponseDto.notExistUser();
            }
        }catch(Exception ex){
            ex.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }
}
