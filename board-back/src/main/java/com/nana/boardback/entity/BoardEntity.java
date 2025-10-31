package com.nana.boardback.entity;

import com.nana.boardback.dto.request.board.PostBoardRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime; // 🚨 java.time 패키지 사용
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp; // 🚨 이 어노테이션을 사용합니다.

@Getter
@NoArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;

    private String title;
    private String content;

    @CreationTimestamp
    @Column(name = "write_datetime")
    private LocalDateTime writeDateTime;

    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writerEmail;

    public BoardEntity(PostBoardRequestDto dto, String email) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.favoriteCount = 0;
        this.commentCount = 0;
        this.viewCount = 0;
        this.writerEmail = email;
    }
    public void increaseFavoriteCount() {
        this.favoriteCount++;
    }
    public void increaseCommentCount() {
        this.commentCount++;
    }
    public void increaseViewCount() {
        this.viewCount++;
    }
}