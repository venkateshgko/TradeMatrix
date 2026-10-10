package com.tradematrix.auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey key;
    private final long expirationMs;

    public JwtService(
        @Value("${tradematrix.jwt.secret}") String secret,
        @Value("${tradematrix.jwt.expiration-ms:86400000}") long expirationMs
    ) {
        if (secret.length() < 32) {
            throw new IllegalArgumentException("tradematrix.jwt.secret must be at least 32 characters.");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String generate(AuthUser user) {
        Date now = new Date();
        return Jwts.builder()
            .subject(user.username())
            .claim("name", user.name())
            .claim("email", user.email())
            .issuedAt(now)
            .expiration(new Date(now.getTime() + expirationMs))
            .signWith(key)
            .compact();
    }

    public String subject(String token) {
        Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();

        return claims.getSubject();
    }
}
