package com.nana.boardback.dto.response.board;

import com.nana.boardback.common.ResponseCode;
import com.nana.boardback.common.ResponseMessage;
import com.nana.boardback.dto.request.board.PatchBoardRequestDto;
import com.nana.boardback.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchBoardResponseDto extends ResponseDto {
    private PatchBoardResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }
    public static ResponseEntity<PatchBoardResponseDto> success() {
        PatchBoardResponseDto dto = new PatchBoardResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
    public static ResponseEntity<ResponseDto> noExistedBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    public static ResponseEntity<ResponseDto> noExistedUser() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    public static ResponseEntity<ResponseDto> noPermission() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    }
}
