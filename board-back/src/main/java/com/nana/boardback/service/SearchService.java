package com.nana.boardback.service;

import com.nana.boardback.dto.response.search.GetPopularListResponseDto;
import com.nana.boardback.dto.response.search.GetRelationListResponseDto;
import org.springframework.http.ResponseEntity;

public interface SearchService {
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);
}
