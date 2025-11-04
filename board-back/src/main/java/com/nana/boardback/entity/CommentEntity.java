package com.nana.boardback.entity;

import com.nana.boardback.dto.request.board.PostCommentRequestDto;
import com.nana.boardback.dto.response.board.PostCommentResponseDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="comment")
@Table(name="comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNumber;
    private String content;
    private String writeDatetime;
    private String userEmail;
    private int boardNumber;

    public CommentEntity(PostCommentRequestDto dto,String email,Integer boardNumber) {

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.content = dto.getContent();
        this.writeDatetime = writeDatetime;
        this.userEmail = email;
        this.boardNumber = boardNumber;
    }
}
