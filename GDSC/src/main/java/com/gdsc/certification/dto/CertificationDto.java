package com.gdsc.certification.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
@Schema(description = "Certification DTO")
public class CertificationDto {
    
    @Schema(description = "Certification ID")
    private Long id;
    
    @NotNull(message = "Student ID is required")
    @Schema(description = "Student ID", example = "1")
    private Long studentId;
    
    @NotNull(message = "Course ID is required")
    @Schema(description = "Course ID", example = "1")
    private Long courseId;
    
    @NotNull(message = "Issue date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Issue date", example = "2024-02-15")
    private LocalDate issueDate;
    
    @Schema(description = "Expiry date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expiryDate;
    
    @Schema(description = "Grade achieved", example = "A")
    private String grade;
    
    @Schema(description = "Certificate URL")
    private String certificateUrl;
    
    @Schema(description = "Verification code", example = "CERT123456")
    private String verificationCode;
    
    @Schema(description = "Certification status", example = "ACTIVE")
    private String status;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
} 
