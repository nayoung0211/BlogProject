package com.nana.boardback.dto.response.board;

import com.nana.boardback.common.ResponseCode;
import com.nana.boardback.common.ResponseMessage;
import com.nana.boardback.dto.object.CommentListItem;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.repository.resultSet.GetCommentListResultSet;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetCommentListResponseDto extends ResponseDto {

    private List<CommentListItem> commentList;


    private GetCommentListResponseDto(List<GetCommentListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.commentList = CommentListItem.copyList(resultSets);
    }
    public static ResponseEntity<GetCommentListResponseDto> success(List<GetCommentListResultSet> resultSets) {
        GetCommentListResponseDto dto = new GetCommentListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
    public static ResponseEntity<ResponseDto> noExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
