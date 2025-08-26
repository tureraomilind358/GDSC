package com.gdsc.exam.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.student.entity.Student;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "exam_results")
@EqualsAndHashCode(callSuper = true)
public class ExamResult extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @NotNull(message = "Total marks are required")
    @Column(name = "total_marks", nullable = false)
    private Integer totalMarks;

    @NotNull(message = "Obtained marks are required")
    @Column(name = "obtained_marks", nullable = false)
    private Integer obtainedMarks;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "grade")
    private String grade;

    @Enumerated(EnumType.STRING)
    @Column(name = "result_status", nullable = false)
    private ResultStatus resultStatus;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "total_students")
    private Integer totalStudents;

    @Column(name = "exam_start_time")
    private LocalDateTime examStartTime;

    @Column(name = "exam_end_time")
    private LocalDateTime examEndTime;

    @Column(name = "total_time_taken_minutes")
    private Integer totalTimeTakenMinutes;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "evaluated_by")
    private String evaluatedBy;

    @Column(name = "evaluation_date")
    private LocalDateTime evaluationDate;

    @Column(name = "is_published")
    private Boolean isPublished = false;

    @Column(name = "published_date")
    private LocalDateTime publishedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum ResultStatus {
        PASS, FAIL, ABSENT, DISQUALIFIED
    }

    public void calculatePercentage() {
        if (totalMarks > 0) {
            this.percentage = (double) obtainedMarks / totalMarks * 100;
        }
    }

    public void calculateGrade() {
        if (percentage != null) {
            if (percentage >= 90) {
                this.grade = "A+";
            } else if (percentage >= 80) {
                this.grade = "A";
            } else if (percentage >= 70) {
                this.grade = "B+";
            } else if (percentage >= 60) {
                this.grade = "B";
            } else if (percentage >= 50) {
                this.grade = "C+";
            } else if (percentage >= 40) {
                this.grade = "C";
            } else {
                this.grade = "F";
            }
        }
    }

    public void determineResultStatus() {
        if (exam != null && exam.getPassingMarks() != null) {
            if (obtainedMarks >= exam.getPassingMarks()) {
                this.resultStatus = ResultStatus.PASS;
            } else {
                this.resultStatus = ResultStatus.FAIL;
            }
        }
    }

    public void publish() {
        this.isPublished = true;
        this.publishedDate = LocalDateTime.now();
    }
}
