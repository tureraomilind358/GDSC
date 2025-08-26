package com.gdsc.teacher.entity;

import com.gdsc.auth.entity.User;
import com.gdsc.common.entity.BaseEntity;
import com.gdsc.course.entity.Course;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "teachers")
@EqualsAndHashCode(callSuper = true)
public class Teacher extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(name = "email", nullable = false, unique = true)
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

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Gender is required")
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Size(max = 1000, message = "Expertise cannot exceed 1000 characters")
    @Column(name = "expertise", columnDefinition = "TEXT")
    private String expertise;

    @Size(max = 1000, message = "Qualifications cannot exceed 1000 characters")
    @Column(name = "qualifications", columnDefinition = "TEXT")
    private String qualifications;

    @Size(max = 1000, message = "Experience cannot exceed 1000 characters")
    @Column(name = "experience", columnDefinition = "TEXT")
    private String experience;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "hourly_rate", precision = 10, scale = 2)
    private BigDecimal hourlyRate;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TeacherStatus status = TeacherStatus.ACTIVE;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "teacher_courses",
        joinColumns = @JoinColumn(name = "teacher_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> assignedCourses = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum TeacherStatus {
        ACTIVE, INACTIVE, ON_LEAVE, TERMINATED
    }

    public void assignCourse(Course course) {
        this.assignedCourses.add(course);
    }

    public void removeCourse(Course course) {
        this.assignedCourses.remove(course);
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
