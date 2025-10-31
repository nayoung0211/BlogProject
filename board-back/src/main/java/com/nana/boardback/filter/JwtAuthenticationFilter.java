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

        // 🚨 CORS Preflight 요청 (OPTIONS 메서드)은 인증 필터를 건너뛰고 바로 통과시킵니다.
        // Preflight 요청은 Authorization 헤더가 없으며, CORS 필터에서만 처리되어야 합니다.
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String path = request.getServletPath();

            // /api/v1/auth 경로는 인증 없이 통과 (로그인/회원가입 등)
            if (path.startsWith("/api/v1/auth")) {
                filterChain.doFilter(request, response);
                return;
            }

            // 🔹 토큰 추출
            String token = parseBearerToken(request);
            if (token == null) {
                // 토큰이 없어도 일단 필터 체인을 계속 진행시킵니다.
                filterChain.doFilter(request, response);
                return;
            }

            // 🔹 토큰 유효성 검사
            String email = jwtProvider.validate(token);
            if (email == null) {
                // 토큰이 유효하지 않아도 일단 필터 체인을 계속 진행시킵니다.
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
            // 예외 발생 시 스택 트레이스를 출력하고, 필터 체인을 계속 진행하여 다른 필터나 컨트롤러에서 처리되도록 합니다.
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