package com.nana.boardback.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {
    @Value("${secret-key}")
    private String secretKEY;

    public String create(String email){
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
            .signWith(SignatureAlgorithm.HS256, secretKEY)
            .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
            .compact();

        return jwt;
    }

    public String validate(String jwt){
        Claims claims = null;
        try{
            claims = Jwts.parser().setSigningKey(secretKEY).parseClaimsJws(jwt).getBody();
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return claims.getSubject();
    }
}
