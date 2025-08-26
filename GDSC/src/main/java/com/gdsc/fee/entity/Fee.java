package com.gdsc.fee.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.course.entity.Course;
import com.gdsc.student.entity.Student;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "fees")
@EqualsAndHashCode(callSuper = true)
public class Fee extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be positive")
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "discount_reason")
    private String discountReason;

    @Column(name = "late_fee", precision = 10, scale = 2)
    private BigDecimal lateFee = BigDecimal.ZERO;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "paid_amount", precision = 10, scale = 0)
    private BigDecimal paidAmount = BigDecimal.ZERO;

    @Column(name = "pending_amount", precision = 10, scale = 2)
    private BigDecimal pendingAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private FeeStatus status = FeeStatus.PENDING;

    @Column(name = "payment_plan")
    private String paymentPlan;

    @Column(name = "installments")
    private Integer installments = 1;

    @Column(name = "current_installment")
    private Integer currentInstallment = 1;

    @OneToMany(mappedBy = "fee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum FeeStatus {
        PENDING, PARTIAL, PAID, OVERDUE, CANCELLED
    }

    public BigDecimal getNetAmount() {
        return totalAmount.subtract(discountAmount);
    }

    public BigDecimal getRemainingAmount() {
        return getNetAmount().add(lateFee).subtract(paidAmount);
    }

    public boolean isOverdue() {
        return LocalDate.now().isAfter(dueDate) && status != FeeStatus.PAID;
    }

    public void calculatePendingAmount() {
        this.pendingAmount = getRemainingAmount();
    }

    public void updateStatus() {
        if (paidAmount.compareTo(BigDecimal.ZERO) == 0) {
            this.status = FeeStatus.PENDING;
        } else if (paidAmount.compareTo(getNetAmount()) >= 0) {
            this.status = FeeStatus.PAID;
        } else {
            this.status = FeeStatus.PARTIAL;
        }
        
        if (isOverdue() && status != FeeStatus.PAID) {
            this.status = FeeStatus.OVERDUE;
        }
    }
}
