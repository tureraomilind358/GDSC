package com.gdsc.exam.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.course.entity.Course;
import com.gdsc.student.entity.Student;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "exams")
@EqualsAndHashCode(callSuper = true)
public class Exam extends BaseEntity {

    @NotBlank(message = "Exam name is required")
    @Size(min = 3, max = 200, message = "Exam name must be between 3 and 200 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @NotNull(message = "Exam date is required")
    @Future(message = "Exam date must be in the future")
    @Column(name = "exam_date", nullable = false)
    private LocalDateTime examDate;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    @Column(name = "exam_type", nullable = false)
    private ExamType examType;

    @Column(name = "total_marks")
    private Integer totalMarks;

    @Column(name = "passing_marks")
    private Integer passingMarks;

    @Column(name = "is_online", nullable = false)
    private Boolean isOnline = false;

    @Column(name = "exam_link")
    private String examLink;

    @Column(name = "instructions", columnDefinition = "TEXT")
    private String instructions;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ExamStatus status = ExamStatus.SCHEDULED;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "exam_students",
        joinColumns = @JoinColumn(name = "exam_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> assignedStudents = new HashSet<>();

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ExamResult> results = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum ExamType {
        MCQ, DESCRIPTIVE, MIXED, PRACTICAL, ORAL, PROJECT
    }

    public enum ExamStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, POSTPONED
    }

    public void assignStudent(Student student) {
        this.assignedStudents.add(student);
    }

    public void removeStudent(Student student) {
        this.assignedStudents.remove(student);
    }

    public boolean isActive() {
        return status == ExamStatus.IN_PROGRESS;
    }

    public boolean isCompleted() {
        return status == ExamStatus.COMPLETED;
    }

    public void startExam() {
        this.status = ExamStatus.IN_PROGRESS;
    }

    public void completeExam() {
        this.status = ExamStatus.COMPLETED;
    }
}
