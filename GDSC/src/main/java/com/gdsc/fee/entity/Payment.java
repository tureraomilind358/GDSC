package com.gdsc.fee.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
@EqualsAndHashCode(callSuper = true)
public class Payment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fee_id", nullable = false)
    private Fee fee;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "gateway_reference")
    private String gatewayReference;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "receipt_number")
    private String receiptNumber;

    @Column(name = "notes")
    private String notes;

    @Column(name = "gateway_response")
    private String gatewayResponse;

    @Column(name = "gateway_fee", precision = 10, scale = 2)
    private BigDecimal gatewayFee = BigDecimal.ZERO;

    @Column(name = "retry_count")
    private Integer retryCount = 0;

    @Column(name = "last_retry_date")
    private LocalDateTime lastRetryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum PaymentMethod {
        CASH, CHEQUE, BANK_TRANSFER, CREDIT_CARD, DEBIT_CARD, ONLINE_PAYMENT, UPI, WALLET
    }

    public enum PaymentStatus {
        PENDING, SUCCESS, FAILED, CANCELLED, REFUNDED, PARTIALLY_REFUNDED
    }

    public void markAsSuccessful(String transactionId, String gatewayReference) {
        this.status = PaymentStatus.SUCCESS;
        this.transactionId = transactionId;
        this.gatewayReference = gatewayReference;
        this.paymentDate = LocalDateTime.now();
    }

    public void markAsFailed(String gatewayResponse) {
        this.status = PaymentStatus.FAILED;
        this.gatewayResponse = gatewayResponse;
        this.retryCount++;
        this.lastRetryDate = LocalDateTime.now();
    }

    public void markAsCancelled() {
        this.status = PaymentStatus.CANCELLED;
    }

    public boolean canRetry() {
        return this.retryCount < 3 && this.status == PaymentStatus.FAILED;
    }

    public void incrementRetryCount() {
        this.retryCount++;
        this.lastRetryDate = LocalDateTime.now();
    }
}
