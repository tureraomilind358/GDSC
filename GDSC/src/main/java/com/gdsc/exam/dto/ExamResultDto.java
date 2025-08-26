package com.gdsc.exam.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Exam Result DTO")
public class ExamResultDto {
    
    @Schema(description = "Result ID")
    private Long id;
    
    @Schema(description = "Student ID", example = "1")
    private Long studentId;
    
    @Schema(description = "Exam ID", example = "1")
    private Long examId;
    
    @Schema(description = "Obtained marks", example = "85")
    private Integer obtainedMarks;
    
    @Schema(description = "Total marks", example = "100")
    private Integer totalMarks;
    
    @Schema(description = "Percentage", example = "85.0")
    private Double percentage;
    
    @Schema(description = "Grade", example = "A")
    private String grade;
    
    @Schema(description = "Result status", example = "PASSED")
    private String status;
    
    @Schema(description = "Submission date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime submissionDate;
    
    @Schema(description = "Evaluation date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime evaluationDate;
    
    @Schema(description = "Remarks")
    private String remarks;
} 
