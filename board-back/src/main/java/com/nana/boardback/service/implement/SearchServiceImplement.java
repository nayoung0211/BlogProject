package com.nana.boardback.service.implement;

import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.dto.response.search.GetPopularListResponseDto;
import com.nana.boardback.repository.SearchLogRepository;
import com.nana.boardback.repository.resultSet.GetPopularResultSet;
import com.nana.boardback.service.SearchService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {

    private final SearchLogRepository  searchLogRepository;

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        List<GetPopularResultSet> resultSets = new ArrayList<>();

        try{

            resultSets = searchLogRepository.getPopularList();

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return  GetPopularListResponseDto.success(resultSets);
    }
}
