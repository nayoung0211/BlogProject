package com.nana.boardback.repository;

import com.nana.boardback.entity.FavoriteEntity;
import com.nana.boardback.entity.primaryKey.FavoritePk;
import com.nana.boardback.repository.resultSet.GetFavoriteResultSet;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String email);
    @Query(
        value=
            "SELECT " +
                "U.email AS email, "+
                "U.profile_image AS profileImage, " +
                "U.nickname AS nickname "+
                "FROM favorite AS F "+
                "INNER JOIN user AS U "+
                "ON F.user_email = U.email "+
                "WHERE F.board_number = ?1",
        nativeQuery = true
    )
    List<GetFavoriteResultSet> getFavoriteList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
