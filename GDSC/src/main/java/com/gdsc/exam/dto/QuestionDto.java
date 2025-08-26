package com.gdsc.exam.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "Question DTO")
public class QuestionDto {
    
    @Schema(description = "Question ID")
    private Long id;
    
    @NotBlank(message = "Question text is required")
    @Size(min = 5, max = 1000, message = "Question text must be between 5 and 1000 characters")
    @Schema(description = "Question text", example = "What is the main method signature in Java?")
    private String text;
    
    @NotNull(message = "Question type is required")
    @Schema(description = "Question type", example = "MCQ")
    private String type;
    
    @NotNull(message = "Marks are required")
    @Positive(message = "Marks must be positive")
    @Schema(description = "Marks for this question", example = "5")
    private Integer marks;
    
    @Schema(description = "Question difficulty", example = "EASY")
    private String difficulty;
    
    @Schema(description = "Question topic", example = "Java Basics")
    private String topic;
    
    @Schema(description = "Correct answer", example = "public static void main(String[] args)")
    private String correctAnswer;
    
    @Schema(description = "Explanation for the answer")
    private String explanation;
    
    @Schema(description = "Question options for MCQ")
    private List<String> options;
    
    @Schema(description = "Exam ID", example = "1")
    private Long examId;
} 
