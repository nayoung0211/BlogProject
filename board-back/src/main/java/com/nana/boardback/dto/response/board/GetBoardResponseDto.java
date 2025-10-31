package com.nana.boardback.dto.response.board;

import com.nana.boardback.common.ResponseCode;
import com.nana.boardback.common.ResponseMessage;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.entity.ImageEntity;
import com.nana.boardback.repository.resultSet.GetBoardResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetBoardResponseDto extends ResponseDto {
    private int boardNumber;
    private String title;
    private String content;
    private List<String> boardImageList;
    private String writeDateTime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;


    private GetBoardResponseDto(GetBoardResultSet resultSet,List<ImageEntity> imageEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        List<String> boardImageList = new ArrayList<>();
        for(ImageEntity imageEntity : imageEntities) {
            String boardImage = imageEntity.getImage();
            boardImageList.add(boardImage);
        }
        this.boardNumber = resultSet.getBoardNumber();
        this.title = resultSet.getTitle();
        this.content = resultSet.getContent();
        this.boardImageList = boardImageList;
        this.writeDateTime = resultSet.getWriteDateTime();
        this.writerEmail = resultSet.getWriterEmail();
        this.writerNickname = resultSet.getWriterNickname();
        this.writerProfileImage = resultSet.getWriterProfileImage();
    }
    public static ResponseEntity<GetBoardResponseDto> success(GetBoardResultSet resultSet,List<ImageEntity> imageEntities) {
        GetBoardResponseDto result = new GetBoardResponseDto(resultSet,imageEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }
    public static ResponseEntity<ResponseDto> notExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }


}
