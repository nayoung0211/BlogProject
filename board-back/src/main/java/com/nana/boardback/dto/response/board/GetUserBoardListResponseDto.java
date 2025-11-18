package com.nana.boardback.dto.response.board;

import com.nana.boardback.common.ResponseCode;
import com.nana.boardback.common.ResponseMessage;
import com.nana.boardback.dto.object.BoardListItem;
import com.nana.boardback.dto.response.ResponseDto;

import com.nana.boardback.entity.BoardListViewEntity;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetUserBoardListResponseDto extends ResponseDto {

    private List<BoardListItem>  userBoardList;

    private GetUserBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userBoardList = BoardListItem.getList(boardListViewEntities);
    }
    public static ResponseEntity<GetUserBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities){
        GetUserBoardListResponseDto result =  new GetUserBoardListResponseDto(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    public static ResponseEntity<ResponseDto> noExistUser(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }


}
