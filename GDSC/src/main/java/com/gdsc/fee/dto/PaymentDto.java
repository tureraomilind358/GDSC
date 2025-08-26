package com.gdsc.fee.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Schema(description = "Payment DTO")
public class PaymentDto {
    
    @Schema(description = "Payment ID")
    private Long id;
    
    @NotNull(message = "Fee ID is required")
    @Schema(description = "Fee ID", example = "1")
    private Long feeId;
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    @Schema(description = "Payment amount", example = "150.00")
    private BigDecimal amount;
    
    @NotNull(message = "Payment method is required")
    @Schema(description = "Payment method", example = "ONLINE")
    private String method;
    
    @Schema(description = "Transaction ID", example = "TXN123456")
    private String transactionId;
    
    @Schema(description = "Payment status", example = "SUCCESS")
    private String status;
    
    @Schema(description = "Payment date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime paymentDate;
    
    @Schema(description = "Payment notes")
    private String notes;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
} 
