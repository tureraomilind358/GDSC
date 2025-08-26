package com.gdsc.fee.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Schema(description = "Fee DTO")
public class FeeDto {
    
    @Schema(description = "Fee ID")
    private Long id;
    
    @NotNull(message = "Course ID is required")
    @Schema(description = "Course ID", example = "1")
    private Long courseId;
    
    @NotNull(message = "Student ID is required")
    @Schema(description = "Student ID", example = "1")
    private Long studentId;
    
    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be positive")
    @Schema(description = "Total fee amount", example = "299.99")
    private BigDecimal totalAmount;
    
    @Schema(description = "Discount percentage", example = "10.0")
    private BigDecimal discount;
    
    @Schema(description = "Late fee amount", example = "25.00")
    private BigDecimal lateFee;
    
    @NotNull(message = "Due date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Due date", example = "2024-02-15")
    private LocalDate dueDate;
    
    @Schema(description = "Amount already paid", example = "150.00")
    private BigDecimal paidAmount;
    
    @Schema(description = "Pending amount", example = "149.99")
    private BigDecimal pendingAmount;
    
    @Schema(description = "Fee status", example = "PENDING")
    private String status;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
} 
