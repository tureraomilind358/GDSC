package com.gdsc.enquiry.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Schema(description = "Enquiry DTO")
public class EnquiryDto {
    
    @Schema(description = "Enquiry ID")
    private Long id;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Schema(description = "First name", example = "Mike")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Schema(description = "Last name", example = "Wilson")
    private String lastName;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Schema(description = "Email address", example = "mike@example.com")
    private String email;
    
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Schema(description = "Phone number", example = "+1234567890")
    private String phone;
    
    @Schema(description = "Interested course ID", example = "1")
    private Long interestedCourseId;
    
    @Schema(description = "Enquiry source", example = "WEBSITE")
    private String source;
    
    @Schema(description = "Enquiry message")
    private String message;
    
    @Schema(description = "Enquiry status", example = "NEW")
    private String status;
    
    @Schema(description = "Follow-up date")
    private String followUpDate;
    
    @Schema(description = "Follow-up notes")
    private String followUpNotes;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
} 
