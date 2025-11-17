package com.nana.boardback.dto.response.search;

import com.nana.boardback.common.ResponseCode;
import com.nana.boardback.common.ResponseMessage;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.repository.resultSet.GetRelationListResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetRelationListResponseDto extends ResponseDto {

    private List<String> relationWordList;

    private GetRelationListResponseDto(List<GetRelationListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> relationWordList = new ArrayList<>();
        for(GetRelationListResultSet resultSet : resultSets){
            String relativeWord = resultSet.getSearchWord();
            relationWordList.add(relativeWord);
        }
        this.relationWordList = relationWordList;
    }
    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets) {
        GetRelationListResponseDto result = new GetRelationListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
