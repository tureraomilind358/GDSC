package com.gdsc.exam.service;

import com.gdsc.exam.dto.QuestionDto;
import com.gdsc.exam.entity.Question;
import com.gdsc.exam.repository.QuestionRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<QuestionDto> getQuestionsByExam(Long examId) {
        return questionRepository.findByExamId(examId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public QuestionDto addQuestionToExam(Long examId, QuestionDto questionDto) {
        Question question = convertToEntity(questionDto);
        Question savedQuestion = questionRepository.save(question);
        return convertToDto(savedQuestion);
    }

    public QuestionDto updateQuestion(Long questionId, QuestionDto questionDto) {
        Question existingQuestion = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", questionId));
        
        // Update fields
        existingQuestion.setQuestionText(questionDto.getText());
        existingQuestion.setQuestionType(Question.QuestionType.valueOf(questionDto.getType()));
        existingQuestion.setMarks(questionDto.getMarks());
        existingQuestion.setDifficultyLevel(questionDto.getDifficulty());
        existingQuestion.setTopic(questionDto.getTopic());
        existingQuestion.setCorrectAnswer(questionDto.getCorrectAnswer());
        existingQuestion.setExplanation(questionDto.getExplanation());
        
        Question updatedQuestion = questionRepository.save(existingQuestion);
        return convertToDto(updatedQuestion);
    }

    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new ResourceNotFoundException("Question", "id", questionId);
        }
        questionRepository.deleteById(questionId);
    }

    private QuestionDto convertToDto(Question question) {
        QuestionDto dto = new QuestionDto();
        dto.setId(question.getId());
        dto.setText(question.getQuestionText());
        dto.setType(question.getQuestionType().name());
        dto.setMarks(question.getMarks());
        dto.setDifficulty(question.getDifficultyLevel());
        dto.setTopic(question.getTopic());
        dto.setCorrectAnswer(question.getCorrectAnswer());
        dto.setExplanation(question.getExplanation());
        if (question.getExam() != null) {
            dto.setExamId(question.getExam().getId());
        }
        return dto;
    }

    private Question convertToEntity(QuestionDto dto) {
        Question question = new Question();
        question.setQuestionText(dto.getText());
        question.setQuestionType(Question.QuestionType.valueOf(dto.getType()));
        question.setMarks(dto.getMarks());
        question.setDifficultyLevel(dto.getDifficulty());
        question.setTopic(dto.getTopic());
        question.setCorrectAnswer(dto.getCorrectAnswer());
        question.setExplanation(dto.getExplanation());
        return question;
    }
} 
