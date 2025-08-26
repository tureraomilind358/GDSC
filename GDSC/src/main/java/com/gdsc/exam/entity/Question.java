package com.gdsc.exam.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "questions")
@EqualsAndHashCode(callSuper = true)
public class Question extends BaseEntity {

    @NotBlank(message = "Question text is required")
    @Column(name = "question_text", columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType;

    @Column(name = "marks", nullable = false)
    @NotNull(message = "Marks are required")
    @Positive(message = "Marks must be positive")
    private Integer marks;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "topic")
    private String topic;

    @Column(name = "correct_answer", columnDefinition = "TEXT")
    private String correctAnswer;

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuestionOption> options = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StudentAnswer> studentAnswers = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    public enum QuestionType {
        MCQ, DESCRIPTIVE, TRUE_FALSE, MATCHING, FILL_IN_THE_BLANK
    }

    public boolean isMCQ() {
        return questionType == QuestionType.MCQ;
    }

    public boolean isDescriptive() {
        return questionType == QuestionType.DESCRIPTIVE;
    }

    public void addOption(QuestionOption option) {
        this.options.add(option);
        option.setQuestion(this);
    }

    public void removeOption(QuestionOption option) {
        this.options.remove(option);
        option.setQuestion(null);
    }
}
