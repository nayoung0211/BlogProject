package com.nana.boardback.repository;

import com.nana.boardback.entity.FavoriteEntity;
import com.nana.boardback.entity.primaryKey.FavoritePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String email);
}
