package com.nana.boardback.service.implement;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import com.nana.boardback.dto.request.board.PostCommentRequestDto;
import com.nana.boardback.dto.response.ResponseDto;
import com.nana.boardback.dto.response.board.GetBoardResponseDto;
import com.nana.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.nana.boardback.dto.response.board.PostBoardResponseDto;
import com.nana.boardback.dto.response.board.PostCommentResponseDto;
import com.nana.boardback.dto.response.board.PutFavoriteResponseDto;
import com.nana.boardback.entity.BoardEntity;
import com.nana.boardback.entity.CommentEntity;
import com.nana.boardback.entity.FavoriteEntity;
import com.nana.boardback.entity.ImageEntity;
import com.nana.boardback.repository.BoardRepository;
import com.nana.boardback.repository.CommentRepository;
import com.nana.boardback.repository.FavoriteRepository;
import com.nana.boardback.repository.ImageRepository;
import com.nana.boardback.repository.UserRepository;
import com.nana.boardback.repository.resultSet.GetBoardResultSet;
import com.nana.boardback.repository.resultSet.GetFavoriteResultSet;
import com.nana.boardback.service.BoardService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository  commentRepository;

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
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber,String email) {
        try{

            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser){
                return PutFavoriteResponseDto.notExistUser();
            }
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null){
                return PutFavoriteResponseDto.noExistBoard();
            }
            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber,email);
            if(favoriteEntity == null){
                favoriteEntity = new FavoriteEntity(email,boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            }
            else{
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }
            boardRepository.save(boardEntity);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PutFavoriteResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {
        List<GetFavoriteResultSet> resultSets = new ArrayList<>();

        try{
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if(!existedBoard){
                return GetFavoriteListResponseDto.noExistBoard();
            }
            resultSets = favoriteRepository.getFavoriteList(boardNumber);

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetFavoriteListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto,
        String email,Integer boardNumber) {
        try{
            boolean existedUser = userRepository.existsByEmail(email);
            if(!existedUser){
                return PostCommentResponseDto.noExistUser();
            }
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if(boardEntity == null){
                return PostCommentResponseDto.noExistBoard();
            }
            CommentEntity commentEntity = new CommentEntity(dto,email,boardNumber);
            commentRepository.save(commentEntity);

            boardEntity.increaseCommentCount();
            boardRepository.save(boardEntity);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostCommentResponseDto.success();
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
