package com.tradematrix.auth;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final AuthStore authStore;

    public JwtAuthFilter(JwtService jwtService, AuthStore authStore) {
        this.jwtService = jwtService;
        this.authStore = authStore;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            try {
                String username = jwtService.subject(header.substring(7));
                AuthUser user = authStore.find(username);

                if (user != null) {
                    var authentication = new UsernamePasswordAuthenticationToken(
                        user.username(),
                        null,
                        List.of()
                    );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception ignored) {
                // Invalid/expired token is treated as unauthenticated.
            }
        }

        filterChain.doFilter(request, response);
    }
}
