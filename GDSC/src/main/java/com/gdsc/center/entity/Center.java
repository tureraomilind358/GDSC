package com.gdsc.center.entity;

import com.gdsc.auth.entity.User;
import com.gdsc.common.entity.BaseEntity;
import com.gdsc.student.entity.Student;
import com.gdsc.teacher.entity.Teacher;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "centers")
@EqualsAndHashCode(callSuper = true)
public class Center extends BaseEntity {

    @NotBlank(message = "Center name is required")
    @Size(min = 2, max = 100, message = "Center name must be between 2 and 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Center code is required")
    @Size(min = 2, max = 20, message = "Center code must be between 2 and 20 characters")
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description")
    private String description;

    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    @Column(name = "address", nullable = false)
    private String address;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    @Column(name = "city", nullable = false)
    private String city;

    @NotBlank(message = "State is required")
    @Size(max = 100, message = "State cannot exceed 100 characters")
    @Column(name = "state", nullable = false)
    private String state;

    @Size(max = 10, message = "Postal code cannot exceed 10 characters")
    @Column(name = "postal_code")
    private String postalCode;

    @NotBlank(message = "Country is required")
    @Size(max = 100, message = "Country cannot exceed 100 characters")
    @Column(name = "country", nullable = false)
    private String country;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Phone number should be valid")
    @Column(name = "phone")
    private String phone;

    @Email(message = "Email should be valid")
    @Column(name = "email")
    private String email;

    @Column(name = "website")
    private String website;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be positive")
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "current_enrollment")
    private Integer currentEnrollment = 0;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "facilities")
    private String facilities;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CenterStatus status = CenterStatus.ACTIVE;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Teacher> teachers = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> staff = new ArrayList<>();

    public enum CenterStatus {
        ACTIVE, INACTIVE, MAINTENANCE, CLOSED
    }

    public boolean hasAvailableCapacity() {
        return currentEnrollment < capacity;
    }

    public void incrementEnrollment() {
        if (hasAvailableCapacity()) {
            this.currentEnrollment++;
        }
    }

    public void decrementEnrollment() {
        if (this.currentEnrollment > 0) {
            this.currentEnrollment--;
        }
    }
}
