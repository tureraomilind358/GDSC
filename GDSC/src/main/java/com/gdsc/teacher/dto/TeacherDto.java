package com.gdsc.teacher.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Schema(description = "Teacher DTO")
public class TeacherDto {
    
    @Schema(description = "Teacher ID")
    private Long id;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Schema(description = "First name", example = "John")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Schema(description = "Last name", example = "Doe")
    private String lastName;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Schema(description = "Email address", example = "john.doe@institute.com")
    private String email;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Schema(description = "Phone number", example = "+1234567890")
    private String phone;
    
    @NotNull(message = "Date of birth is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Date of birth", example = "1980-05-15")
    private LocalDate dateOfBirth;
    
    @NotNull(message = "Gender is required")
    @Schema(description = "Gender", example = "MALE")
    private String gender;
    
    @Schema(description = "Address", example = "123 Main St")
    private String address;
    
    @Schema(description = "City", example = "New York")
    private String city;
    
    @Schema(description = "State", example = "NY")
    private String state;
    
    @Schema(description = "ZIP code", example = "10001")
    private String zipCode;
    
    @NotNull(message = "Hire date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Hire date", example = "2020-08-01")
    private LocalDate hireDate;
    
    @Schema(description = "Expertise area", example = "Computer Science")
    private String expertise;
    
    @Schema(description = "Qualification", example = "Ph.D. Computer Science")
    private String qualification;
    
    @Min(value = 0, message = "Experience must be non-negative")
    @Schema(description = "Years of experience", example = "10")
    private Integer experience;
    
    @Positive(message = "Salary must be positive")
    @Schema(description = "Annual salary", example = "75000.00")
    private BigDecimal salary;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
} 
