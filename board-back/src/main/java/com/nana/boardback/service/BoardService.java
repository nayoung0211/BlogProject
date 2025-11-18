package com.nana.boardback.service;

import com.nana.boardback.dto.request.board.PatchBoardRequestDto;
import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.request.board.PostCommentRequestDto;
import com.nana.boardback.dto.response.board.DeleteBoardResponseDto;
import com.nana.boardback.dto.response.board.GetBoardResponseDto;
import com.nana.boardback.dto.response.board.GetCommentListResponseDto;
import com.nana.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.nana.boardback.dto.response.board.GetLatestBoardListResponseDto;
import com.nana.boardback.dto.response.board.GetSearchBoardListResponseDto;
import com.nana.boardback.dto.response.board.GetTop3BoardListResponseDto;
import com.nana.boardback.dto.response.board.GetUserBoardListResponseDto;
import com.nana.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.nana.boardback.dto.response.board.PatchBoardResponseDto;
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
    ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(Integer boardNumber);
    ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber,String email);
    ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();
    ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();
    ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord,String preSearchWord);
    ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto,Integer boardNumber,String email);
    ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto,String email,Integer boardNumber);
}
