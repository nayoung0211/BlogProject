package com.nana.boardback.filter;

import com.nana.boardback.provider.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationTargetUrlRequestHandler;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider  jwtProvider;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);
            if(token == null){
                filterChain.doFilter(request,response);
                return;
            }
            String email = jwtProvider.validate(token);

            if(email == null){
                filterChain.doFilter(request,response);
                return;
            }

            AbstractAuthenticationToken abstractAuthenticationToken =
                new UsernamePasswordAuthenticationToken(email,null, AuthorityUtils.NO_AUTHORITIES);

            abstractAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(abstractAuthenticationToken);

            SecurityContextHolder.setContext(securityContext);
        }catch (Exception e){
            e.printStackTrace();
        }
        filterChain.doFilter(request,response);
    }

    private String parseBearerToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if(!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
