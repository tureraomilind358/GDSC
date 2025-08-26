package com.gdsc.exam.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Exam DTO")
public class ExamDto {
    
    @Schema(description = "Exam ID")
    private Long id;
    
    @NotBlank(message = "Exam name is required")
    @Size(min = 2, max = 100, message = "Exam name must be between 2 and 100 characters")
    @Schema(description = "Exam name", example = "Java Midterm Exam")
    private String name;
    
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @Schema(description = "Exam description", example = "Midterm examination for Java Programming course")
    private String description;
    
    @NotNull(message = "Course ID is required")
    @Schema(description = "Course ID", example = "1")
    private Long courseId;
    
    @NotNull(message = "Exam date is required")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "Exam date and time", example = "2024-02-20T10:00:00")
    private LocalDateTime examDate;
    
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    @Schema(description = "Duration in minutes", example = "120")
    private Integer duration;
    
    @NotNull(message = "Exam type is required")
    @Schema(description = "Exam type", example = "MIDTERM")
    private String type;
    
    @NotNull(message = "Total marks are required")
    @Positive(message = "Total marks must be positive")
    @Schema(description = "Total marks", example = "100")
    private Integer totalMarks;
    
    @Schema(description = "Is online exam", example = "true")
    private Boolean isOnline;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
} 
