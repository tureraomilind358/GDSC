package com.gdsc.auth.service;

import com.gdsc.auth.dto.AuthRequest;
import com.gdsc.auth.dto.AuthResponse;
import com.gdsc.auth.dto.RegisterRequest;
import com.gdsc.auth.entity.Role;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.repository.RoleRepository;
import com.gdsc.auth.repository.UserRepository;
import com.gdsc.auth.util.JwtUtil;
import com.gdsc.auth.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .username(userDetails.getUsername())
                .roles(userDetails.getAuthorities().stream()
                        .map(Object::toString)
                        .toList())
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());

        // Set default role as STUDENT
        Role studentRole = roleRepository.findByName(Role.RoleType.STUDENT)
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        user.addRole(studentRole);

        User savedUser = userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .username(userDetails.getUsername())
                .roles(userDetails.getAuthorities().stream()
                        .map(Object::toString)
                        .toList())
                .build();
    }

    public AuthResponse refreshToken(String token) {
        if (jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            String newToken = jwtUtil.refreshToken(token);

            return AuthResponse.builder()
                    .token(newToken)
                    .username(userDetails.getUsername())
                    .roles(userDetails.getAuthorities().stream()
                            .map(Object::toString)
                            .toList())
                    .build();
        }
        throw new RuntimeException("Invalid token");
    }
}
