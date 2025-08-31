package com.gdsc.student.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Schema(description = "Student DTO")
public class StudentDto {
    
    @Schema(description = "Student ID")
    private Long id;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Schema(description = "First name", example = "Jane")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Schema(description = "Last name", example = "Smith")
    private String lastName;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Schema(description = "Email address", example = "jane@example.com")
    private String email;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Schema(description = "Phone number", example = "+1234567890")
    private String phone;
    
    @NotNull(message = "Date of birth is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Date of birth", example = "2000-01-01")
    private LocalDate dateOfBirth;
    
    @NotNull(message = "Gender is required")
    @Schema(description = "Gender", example = "FEMALE")
    private String gender;
    
    @Schema(description = "Address", example = "123 Main St")
    private String address;
    
    @Schema(description = "City", example = "New York")
    private String city;
    
    @Schema(description = "State", example = "NY")
    private String state;
    
    @Schema(description = "ZIP code", example = "10001")
    private String zipCode;
    
    @NotNull(message = "Enrollment date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Enrollment date", example = "2024-01-15")
    private LocalDate enrollmentDate;
    
    @Schema(description = "Student status", example = "ACTIVE")
    private String status;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
    
    @Schema(description = "User ID for authentication", example = "1")
    private Long userId;
}
