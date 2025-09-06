package com.gdsc.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Set;

@Data
@Schema(description = "User DTO")
public class UserDto {

    @Schema(description = "User ID")
    private Long id;
    
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Schema(description = "Username", example = "john_doe")
    private String username;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Schema(description = "Email address", example = "john.doe@example.com")
    private String email;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Schema(description = "First name", example = "John")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Schema(description = "Last name", example = "Doe")
    private String lastName;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Schema(description = "Phone number", example = "+1234567890")
    private String phone;
    
    @Schema(description = "Account enabled status")
    private Boolean isEnabled;
    
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Schema(description = "Password", example = "password123")
    private String password;
    
    @Schema(description = "Account non-expired status")
    private Boolean isAccountNonExpired;
    
    @Schema(description = "Account non-locked status")
    private Boolean isAccountNonLocked;
    
    @Schema(description = "Credentials non-expired status")
    private Boolean isCredentialsNonExpired;
    
    @Schema(description = "User roles")
    private Set<String> roles;
    
    @Schema(description = "Center ID")
    private Long centerId;
}


