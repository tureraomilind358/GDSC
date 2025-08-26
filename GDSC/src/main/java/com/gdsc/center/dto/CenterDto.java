package com.gdsc.center.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Schema(description = "Center DTO")
public class CenterDto {
    
    @Schema(description = "Center ID")
    private Long id;
    
    @NotBlank(message = "Center name is required")
    @Size(min = 2, max = 100, message = "Center name must be between 2 and 100 characters")
    @Schema(description = "Center name", example = "Main Campus")
    private String name;
    
    @NotBlank(message = "Center code is required")
    @Size(min = 2, max = 20, message = "Center code must be between 2 and 20 characters")
    @Schema(description = "Center code", example = "MC001")
    private String code;
    
    @NotBlank(message = "Address is required")
    @Schema(description = "Street address", example = "789 University Blvd")
    private String address;
    
    @NotBlank(message = "City is required")
    @Schema(description = "City", example = "Chicago")
    private String city;
    
    @NotBlank(message = "State is required")
    @Size(min = 2, max = 50, message = "State must be between 2 and 50 characters")
    @Schema(description = "State", example = "IL")
    private String state;
    
    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "ZIP code must be valid")
    @Schema(description = "ZIP code", example = "60601")
    private String zipCode;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Schema(description = "Phone number", example = "+1234567890")
    private String phone;
    
    @Email(message = "Email should be valid")
    @Schema(description = "Email address", example = "main@institute.com")
    private String email;
    
    @Positive(message = "Capacity must be positive")
    @Schema(description = "Maximum capacity", example = "500")
    private Integer capacity;
    
    @Schema(description = "Center status", example = "ACTIVE")
    private String status;
    
    @Schema(description = "Center description")
    private String description;
} 
