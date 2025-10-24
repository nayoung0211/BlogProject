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
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        try {
            String path = request.getServletPath();


            if (path.startsWith("/api/v1/auth")) {
                filterChain.doFilter(request, response);
                return;
            }

            // 🔹 토큰 추출
            String token = parseBearerToken(request);
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // 🔹 토큰 유효성 검사
            String email = jwtProvider.validate(token);
            if (email == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // 🔹 인증 객체 생성 및 SecurityContext에 저장
            AbstractAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(context);

        } catch (Exception e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer");
        if (!isBearer) return null;

        return authorization.substring(7);
    }
}
