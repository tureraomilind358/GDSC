package com.gdsc.enquiry.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.course.entity.Course;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "enquiries")
@EqualsAndHashCode(callSuper = true)
public class Enquiry extends BaseEntity {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(name = "email", nullable = false)
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Column(name = "phone")
    private String phone;

    @Size(max = 500, message = "Address cannot exceed 500 characters")
    @Column(name = "address")
    private String address;

    @Size(max = 100, message = "City cannot exceed 100 characters")
    @Column(name = "city")
    private String city;

    @Size(max = 100, message = "State cannot exceed 100 characters")
    @Column(name = "state")
    private String state;

    @Size(max = 10, message = "Postal code cannot exceed 10 characters")
    @Column(name = "postal_code")
    private String postalCode;

    @Size(max = 100, message = "Country cannot exceed 100 characters")
    @Column(name = "country")
    private String country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interested_course_id")
    private Course interestedCourse;

    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Size(max = 1000, message = "Notes cannot exceed 1000 characters")
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EnquiryStatus status = EnquiryStatus.NEW;

    @Enumerated(EnumType.STRING)
    @Column(name = "source")
    private EnquirySource source;

    @Column(name = "follow_up_date")
    private LocalDateTime followUpDate;

    @Column(name = "converted_to_student")
    private Boolean convertedToStudent = false;

    @Column(name = "conversion_date")
    private LocalDateTime conversionDate;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "priority")
    private Integer priority = 1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum EnquiryStatus {
        NEW, IN_PROGRESS, CONTACTED, FOLLOW_UP, CONVERTED, LOST, CLOSED
    }

    public enum EnquirySource {
        WEBSITE, REFERRAL, SOCIAL_MEDIA, ADVERTISEMENT, WALK_IN, PHONE, OTHER
    }

    public void markAsConverted() {
        this.status = EnquiryStatus.CONVERTED;
        this.convertedToStudent = true;
        this.conversionDate = LocalDateTime.now();
    }

    public void updateStatus(EnquiryStatus newStatus) {
        this.status = newStatus;
        if (newStatus == EnquiryStatus.FOLLOW_UP) {
            this.followUpDate = LocalDateTime.now().plusDays(7);
        }
    }
}
