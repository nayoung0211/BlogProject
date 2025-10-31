package com.nana.boardback.service;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.response.board.GetBoardResponseDto;
import com.nana.boardback.dto.response.board.PostBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto,String email);
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);

}
