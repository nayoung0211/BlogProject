package com.nana.boardback.dto.response.search;

import com.nana.boardback.common.ResponseCode;
import com.nana.boardback.common.ResponseMessage;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.repository.resultSet.GetPopularResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetPopularListResponseDto extends ResponseDto {

    private List<String> popularWordList;

    private GetPopularListResponseDto(List<GetPopularResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        List<String> popularWordList = new ArrayList<>();
        for(GetPopularResultSet resultSet : resultSets){
            String popularWord = resultSet.getSearchWord();
            popularWordList.add(popularWord);
        }
        this.popularWordList = popularWordList;
    }
    public static ResponseEntity<GetPopularListResponseDto> success(List<GetPopularResultSet> resultSets){
        GetPopularListResponseDto result =  new GetPopularListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
