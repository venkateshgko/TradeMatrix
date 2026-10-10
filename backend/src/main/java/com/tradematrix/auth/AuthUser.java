package com.tradematrix.auth;

public record AuthUser(String username, String name, String email, String passwordHash) {}
