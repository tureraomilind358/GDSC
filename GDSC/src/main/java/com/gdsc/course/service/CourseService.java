package com.gdsc.course.service;

import com.gdsc.common.exception.ResourceNotFoundException;
import com.gdsc.course.dto.CourseDto;
import com.gdsc.course.entity.Course;
import com.gdsc.course.entity.CourseCategory;
import com.gdsc.course.repository.CourseRepository;
import com.gdsc.course.repository.CourseCategoryRepository;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseCategoryRepository courseCategoryRepository;
    private final CenterRepository centerRepository;

    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return convertToDto(course);
    }

    public CourseDto createCourse(CourseDto courseDto) {
        Course course = convertToEntity(courseDto);
        Course savedCourse = courseRepository.save(course);
        return convertToDto(savedCourse);
    }

    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        
        existingCourse.setName(courseDto.getName());
        existingCourse.setDescription(courseDto.getDescription());
        existingCourse.setImageUrl(courseDto.getImage());
        existingCourse.setPlatforms(courseDto.getPlatforms().toString());
        existingCourse.setDurationHours(Integer.parseInt(courseDto.getDuration()));
        existingCourse.setFees(courseDto.getFees());
        existingCourse.setDiscountPercentage(courseDto.getDiscount().intValue());
        existingCourse.setMaxStudents(courseDto.getMaxStudents());
        existingCourse.setIsPublished(courseDto.getIsPublished());
        
        // Handle CourseCategory relationship
        if (courseDto.getCategoryId() != null) {
            CourseCategory category = courseCategoryRepository.findById(courseDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("CourseCategory not found with id: " + courseDto.getCategoryId()));
            existingCourse.setCategory(category);
        }
        
        if (courseDto.getCenterId() != null) {
            Center center = centerRepository.findById(courseDto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + courseDto.getCenterId()));
            existingCourse.setCenter(center);
        }
        
        Course updatedCourse = courseRepository.save(existingCourse);
        return convertToDto(updatedCourse);
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }

    public List<CourseDto> searchCourses(String keyword) {
        return courseRepository.searchCourses(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CourseDto> getCoursesByCategory(Long categoryId) {
        return courseRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CourseDto> getCoursesByCenter(Long centerId) {
        return courseRepository.findByCenterId(centerId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CourseDto> getPublishedCourses() {
        return courseRepository.findByIsPublished(true).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CourseDto convertToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setName(course.getName());
        dto.setDescription(course.getDescription());
        dto.setImage(course.getImageUrl());
        dto.setPlatforms(List.of(course.getPlatforms().split(",")));
        dto.setDuration(String.valueOf(course.getDurationHours()));
        dto.setFees(course.getFees());
        dto.setDiscount(course.getDiscountPercentage() != null ? 
            new java.math.BigDecimal(course.getDiscountPercentage()) : java.math.BigDecimal.ZERO);
        dto.setMaxStudents(course.getMaxStudents());
        dto.setIsPublished(course.getIsPublished());
        dto.setCategoryId(course.getCategory() != null ? course.getCategory().getId() : null);
        dto.setCenterId(course.getCenter() != null ? course.getCenter().getId() : null);
        return dto;
    }

    private Course convertToEntity(CourseDto dto) {
        Course course = new Course();
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setImageUrl(dto.getImage());
        course.setPlatforms(String.join(",", dto.getPlatforms()));
        course.setDurationHours(Integer.parseInt(dto.getDuration()));
        course.setFees(dto.getFees());
        course.setDiscountPercentage(dto.getDiscount() != null ? dto.getDiscount().intValue() : null);
        course.setMaxStudents(dto.getMaxStudents());
        course.setIsPublished(dto.getIsPublished());
        
        // Handle CourseCategory relationship
        if (dto.getCategoryId() != null) {
            CourseCategory category = courseCategoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("CourseCategory not found with id: " + dto.getCategoryId()));
            course.setCategory(category);
        }
        
        if (dto.getCenterId() != null) {
            Center center = centerRepository.findById(dto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + dto.getCenterId()));
            course.setCenter(center);
        }
        
        return course;
    }
}
