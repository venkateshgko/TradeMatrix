package com.tradematrix.auth;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class GoogleOAuth2FailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException exception
    ) throws IOException, ServletException {
        response.sendRedirect("http://localhost:5173/login?error=google_auth_failed");
    }
}
