package com.nana.boardback.service.implement;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.dto.response.board.PostBoardResponseDto;
import com.nana.boardback.entity.BoardEntity;
import com.nana.boardback.repository.BoardRepository;
import com.nana.boardback.repository.UserRepository;
import com.nana.boardback.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try{
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail){
                return PostBoardResponseDto.notExistUser();
            }
            BoardEntity boardEntity = new BoardEntity(dto,email);
            boardRepository.save(boardEntity);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostBoardResponseDto.success();
    }
}
