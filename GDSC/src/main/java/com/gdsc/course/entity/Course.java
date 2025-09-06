package com.gdsc.course.entity;

import com.gdsc.auth.entity.User;
import com.gdsc.common.entity.BaseEntity;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "courses")
@EqualsAndHashCode(callSuper = true)
public class Course extends BaseEntity {

    @NotBlank(message = "Course name is required")
    @Size(min = 3, max = 200, message = "Course name must be between 3 and 200 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "platforms")
    private String platforms;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    @Column(name = "duration_hours", nullable = false)
    private Integer durationHours;

    @NotNull(message = "Fees are required")
    @Positive(message = "Fees must be positive")
    @Column(name = "fees", nullable = false, precision = 10, scale = 2)
    private BigDecimal fees;

    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    @Column(name = "max_students")
    private Integer maxStudents;

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CourseCategory category;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "course_teachers",
        joinColumns = @JoinColumn(name = "course_id"),
        inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private Set<User> teachers = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "course_students",
        joinColumns = @JoinColumn(name = "course_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<User> enrolledStudents = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public void addTeacher(User teacher) {
        this.teachers.add(teacher);
    }

    public void removeTeacher(User teacher) {
        this.teachers.remove(teacher);
    }

    public void enrollStudent(User student) {
        this.enrolledStudents.add(student);
    }

    public void removeStudent(User student) {
        this.enrolledStudents.remove(student);
    }

    public BigDecimal getDiscountedFees() {
        if (discountPercentage != null && discountPercentage > 0) {
            return fees.multiply(BigDecimal.valueOf(100 - discountPercentage))
                    .divide(BigDecimal.valueOf(100));
        }
        return fees;
    }
}
