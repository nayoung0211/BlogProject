package com.nana.boardback.dto.object;

import com.nana.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.nana.boardback.repository.resultSet.GetFavoriteResultSet;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteListItem {
    private String email;
    private String nickname;
    private String profileImage;

    public FavoriteListItem(GetFavoriteResultSet resultSet){
        this.email=resultSet.getEmail();
        this.nickname=resultSet.getNickname();
        this.profileImage=resultSet.getProfileImage();
    }

    public static List<FavoriteListItem> copyList(List<GetFavoriteResultSet> resultSets){
        List<FavoriteListItem> list=new ArrayList<>();
        for(GetFavoriteResultSet resultSet: resultSets){
            FavoriteListItem favoriteListItem = new FavoriteListItem(resultSet);
            list.add(favoriteListItem);
        }
        return list;
    }
}
