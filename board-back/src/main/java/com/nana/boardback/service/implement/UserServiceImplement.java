package com.nana.boardback.service.implement;

import com.nana.boardback.dto.request.user.PatchNicknameRequestDto;
import com.nana.boardback.dto.request.user.PatchProfileImageRequestDto;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.dto.response.user.GetSignInUserResponseDto;
import com.nana.boardback.dto.response.user.GetUserResponseDto;
import com.nana.boardback.dto.response.user.PatchNicknameResponseDto;
import com.nana.boardback.dto.response.user.PatchProfileImageResponseDto;
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
    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email){
        UserEntity userEntity = null;
        try{
            userEntity = userRepository.findByEmail(email);
            if(userEntity == null){
                return GetUserResponseDto.noExistUser();
            }

        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserResponseDto.success(userEntity);
    }
    @Override
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(
        PatchNicknameRequestDto dto,String email){

        try{
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null){
                return PatchNicknameResponseDto.noExistUser();
            }
            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if(existedNickname){
                return PatchNicknameResponseDto.duplicateNickname();
            }
            userEntity.setNickname(nickname);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchNicknameResponseDto.success();
    }

    @Override
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto,String email){

        try{
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null){
                return PatchProfileImageResponseDto.noExistUser();
            }
            String profileImage = dto.getProfileImage();
            userEntity.setProfileImage(profileImage);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PatchProfileImageResponseDto.success();
    }
}
