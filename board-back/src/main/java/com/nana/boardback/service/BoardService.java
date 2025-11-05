package com.nana.boardback.service;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.request.board.PostCommentRequestDto;
import com.nana.boardback.dto.response.board.GetBoardResponseDto;
import com.nana.boardback.dto.response.board.GetCommentListResponseDto;
import com.nana.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.nana.boardback.dto.response.board.PostBoardResponseDto;
import com.nana.boardback.dto.response.board.PostCommentResponseDto;
import com.nana.boardback.dto.response.board.PutFavoriteResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto,String email);
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber,String email);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto,String email,Integer boardNumber);
}
