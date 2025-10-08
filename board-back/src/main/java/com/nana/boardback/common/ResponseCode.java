package com.nana.boardback.common;

public interface ResponseCode {
    //HTTP status = 200
    public static final String SUCCESS = "SU";
    //HTTP status = 400
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    String DUPLICATE_TEL_NUMBER = "DT";
    String NOT_EXISTED_USER = "NU";
    String NOT_EXISTED_BOARD= "NB";

    //HTTP 401
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";

    //HTTP 403
    String NO_PERMISSION = "NP";

    //HTTP 500
    String DATABASE_ERROR = "DBE";


}
