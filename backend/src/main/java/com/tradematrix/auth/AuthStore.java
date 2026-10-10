package com.tradematrix.auth;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthStore {
    private final Map<String, AuthUser> users = new ConcurrentHashMap<>();
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthStore() {
        // Development/college-project default account requested for TradeMatrix.
        // Change/remove this before production and persist users in PostgreSQL.
        AuthUser admin = new AuthUser(
            "admin",
            "Administrator",
            "admin@tradematrix.local",
            passwordEncoder.encode("12345678")
        );
        users.put(admin.username(), admin);
    }

    public synchronized AuthUser register(String username, String name, String email, String password) {
        String normalized = normalize(username);
        if (users.containsKey(normalized)) {
            throw new IllegalArgumentException("That username is already in use.");
        }

        AuthUser user = new AuthUser(
            normalized,
            name.trim(),
            email.trim().toLowerCase(),
            passwordEncoder.encode(password)
        );
        users.put(normalized, user);
        return user;
    }

    public AuthUser find(String username) {
        return users.get(normalize(username));
    }

    public boolean matches(String rawPassword, AuthUser user) {
        return passwordEncoder.matches(rawPassword, user.passwordHash());
    }

    private String normalize(String username) {
        return username.trim().toLowerCase();
    }
}
