package com.nana.boardback.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    /**
     * FilterRegistrationBean을 사용하여 CorsFilter를 등록하고,
     * 필터 체인의 가장 높은 우선순위(가장 낮은 Order 값)를 부여하여
     * JWT 인증 필터보다 먼저 실행되도록 강제합니다.
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. CORS 설정
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React Origin
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));

        // 2. 모든 경로에 설정 적용
        source.registerCorsConfiguration("/**", config);

        // 3. FilterRegistrationBean에 CorsFilter 등록
        FilterRegistrationBean<CorsFilter> bean =
            new FilterRegistrationBean<>(new CorsFilter(source));

        // 4. 🚨 필터 순서를 최우선(가장 낮은 값)으로 설정
        //    (JwtAuthenticationFilter보다 반드시 먼저 실행되어야 합니다.)
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return bean;
    }
}