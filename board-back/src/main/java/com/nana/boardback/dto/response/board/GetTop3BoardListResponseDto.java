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
public class GetTop3BoardListResponseDto extends ResponseDto {
    private List<BoardListItem> top3List;

    private GetTop3BoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.top3List = BoardListItem.getList(boardListViewEntities);
    }
    public static ResponseEntity<GetTop3BoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities){
        GetTop3BoardListResponseDto result = new GetTop3BoardListResponseDto(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


}
