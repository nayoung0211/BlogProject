package com.nana.boardback.repository;

import com.nana.boardback.entity.ImageEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {


    List<ImageEntity> findByBoardNumber(Integer boardNumber);
}
