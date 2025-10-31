package com.nana.boardback.controller;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.response.board.GetBoardResponseDto;
import com.nana.boardback.dto.response.board.PostBoardResponseDto;
import com.nana.boardback.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(@PathVariable("boardNumber") Integer boardNumber){
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid PostBoardRequestDto requestBody,
        @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
        return response;
    }
}
