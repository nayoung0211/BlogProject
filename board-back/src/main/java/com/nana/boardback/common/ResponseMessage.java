package com.nana.boardback.common;

public interface ResponseMessage {
    //HTTP status = 200
    public static final String SUCCESS = "Success";
    //HTTP status = 400
    String VALIDATION_FAILED = "validation failed";
    String DUPLICATE_EMAIL = "duplicate email";
    String DUPLICATE_NICKNAME = "duplicate nickname";
    String DUPLICATE_TEL_NUMBER = "duplicate telephone number";
    String NOT_EXISTED_USER = "not existed user";
    String NOT_EXISTED_BOARD= "not existed board";

    //HTTP 401
    String SIGN_IN_FAIL = "sign in failure";
    String AUTHORIZATION_FAIL = "authorization failure";

    //HTTP 403
    String NO_PERMISSION = "no permission";

    //HTTP 500
    String DATABASE_ERROR = "database error ";

}
