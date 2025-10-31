package com.nana.boardback.service.implement;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.dto.response.board.GetBoardResponseDto;
import com.nana.boardback.dto.response.board.PostBoardResponseDto;
import com.nana.boardback.entity.BoardEntity;
import com.nana.boardback.entity.ImageEntity;
import com.nana.boardback.repository.BoardRepository;
import com.nana.boardback.repository.ImageRepository;
import com.nana.boardback.repository.UserRepository;
import com.nana.boardback.repository.resultSet.GetBoardResultSet;
import com.nana.boardback.service.BoardService;
import java.awt.Image;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();

        try{
            resultSet = boardRepository.getBoard(boardNumber);
            if(resultSet == null) return GetBoardResponseDto.notExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet,imageEntities);

    }


    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try{
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail){
                return PostBoardResponseDto.notExistUser();
            }
            BoardEntity boardEntity = new BoardEntity(dto,email);
            boardRepository.save(boardEntity);

            int boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for(String image: boardImageList){
                ImageEntity imageEntity = new ImageEntity(boardNumber,image);
                imageEntities.add(imageEntity);
            }
            imageRepository.saveAll(imageEntities);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostBoardResponseDto.success();
    }


}
