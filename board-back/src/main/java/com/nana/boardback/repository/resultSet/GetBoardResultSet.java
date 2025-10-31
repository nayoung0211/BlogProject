package com.nana.boardback.repository.resultSet;

public interface GetBoardResultSet {
    Integer getBoardNumber();
    String getTitle();
    String getContent();
    String getWriteDateTime();
    String getWriterEmail();
    String getWriterNickname();
    String getWriterProfileImage();

}
