package com.tradematrix.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthStore authStore;
    private final JwtService jwtService;

    public AuthController(AuthStore authStore, JwtService jwtService) {
        this.authStore = authStore;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthUser user = authStore.register(
                request.username(),
                request.name(),
                request.email(),
                request.password()
            );
            return AuthResponse.of(user, jwtService.generate(user));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ex.getMessage());
        }
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        AuthUser user = authStore.find(request.username());

        if (user == null || !authStore.matches(request.password(), user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password.");
        }

        return AuthResponse.of(user, jwtService.generate(user));
    }

    @GetMapping("/me")
    public AuthResponse me(Authentication authentication) {
        AuthUser user = authStore.find(authentication.getName());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found.");
        }
        return AuthResponse.of(user, null);
    }

    public record RegisterRequest(
        @NotBlank @Size(min = 3, max = 40) String username,
        @NotBlank @Size(min = 2, max = 80) String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 100) String password
    ) {}

    public record LoginRequest(
        @NotBlank @Size(min = 3, max = 40) String username,
        @NotBlank String password
    ) {}

    public record AuthResponse(String username, String name, String email, String token) {
        static AuthResponse of(AuthUser user, String token) {
            return new AuthResponse(user.username(), user.name(), user.email(), token);
        }
    }
}
