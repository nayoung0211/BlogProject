package com.nana.boardback.dto.request.board;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class PostCommentRequestDto {

    @NotBlank
    private String content;

}
