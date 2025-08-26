package com.gdsc.exam.repository;

import com.gdsc.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findByExamId(Long examId);
    
    List<Question> findByQuestionType(Question.QuestionType questionType);
    
    List<Question> findByDifficultyLevel(String difficultyLevel);
    
    List<Question> findByTopic(String topic);
    
    List<Question> findByCenterId(Long centerId);
} 
