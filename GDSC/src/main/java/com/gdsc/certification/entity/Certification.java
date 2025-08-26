package com.gdsc.certification.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.course.entity.Course;
import com.gdsc.student.entity.Student;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "certifications")
@EqualsAndHashCode(callSuper = true)
public class Certification extends BaseEntity {

    @Column(name = "certificate_id", nullable = false, unique = true)
    private String certificateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @NotNull(message = "Issue date is required")
    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "certificate_url")
    private String certificateUrl;

    @Column(name = "pdf_path")
    private String pdfPath;

    @Column(name = "verification_code")
    private String verificationCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CertificationStatus status = CertificationStatus.ACTIVE;

    @Column(name = "issued_by")
    private String issuedBy;

    @Column(name = "issued_at")
    private LocalDateTime issuedAt;

    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;

    @Column(name = "revocation_reason")
    private String revocationReason;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "verification_count")
    private Integer verificationCount = 0;

    @Column(name = "last_verified_at")
    private LocalDateTime lastVerifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum CertificationStatus {
        ACTIVE, EXPIRED, REVOKED, SUSPENDED
    }

    @PrePersist
    protected void onCreate() {
        super.onCreate();
        if (certificateId == null) {
            this.certificateId = generateCertificateId();
        }
        if (verificationCode == null) {
            this.verificationCode = generateVerificationCode();
        }
        if (issuedAt == null) {
            this.issuedAt = LocalDateTime.now();
        }
    }

    private String generateCertificateId() {
        return "CERT-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private String generateVerificationCode() {
        return UUID.randomUUID().toString().substring(0, 12).toUpperCase();
    }

    public boolean isValid() {
        return status == CertificationStatus.ACTIVE && 
               (expiryDate == null || LocalDate.now().isBefore(expiryDate));
    }

    public void revoke(String reason) {
        this.status = CertificationStatus.REVOKED;
        this.revokedAt = LocalDateTime.now();
        this.revocationReason = reason;
    }

    public void verify() {
        this.isVerified = true;
        this.verificationCount++;
        this.lastVerifiedAt = LocalDateTime.now();
    }

    public boolean isExpired() {
        return expiryDate != null && LocalDate.now().isAfter(expiryDate);
    }
}
