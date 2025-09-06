package com.gdsc.course.service;

import com.gdsc.common.exception.DuplicateResourceException;
import com.gdsc.common.exception.ResourceNotFoundException;
import com.gdsc.course.dto.CourseCategoryDto;
import com.gdsc.course.entity.CourseCategory;
import com.gdsc.course.repository.CourseCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseCategoryService {

    @Autowired
    private CourseCategoryRepository courseCategoryRepository;

    public List<CourseCategoryDto> getAllCategories() {
        return courseCategoryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CourseCategoryDto getCategoryById(Long id) {
        CourseCategory category = courseCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CourseCategory", "id", id));
        return convertToDto(category);
    }

    public CourseCategoryDto createCategory(CourseCategoryDto categoryDto) {
        // Validate for duplicate category name
        if (categoryDto.getName() != null && courseCategoryRepository.existsByName(categoryDto.getName())) {
            throw new DuplicateResourceException("CourseCategory", "name", categoryDto.getName());
        }
        
        CourseCategory category = convertToEntity(categoryDto);
        CourseCategory savedCategory = courseCategoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public CourseCategoryDto updateCategory(Long id, CourseCategoryDto categoryDto) {
        CourseCategory existingCategory = courseCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CourseCategory", "id", id));
        
        // Validate for duplicate category name (only if name is being changed)
        if (categoryDto.getName() != null && !categoryDto.getName().equals(existingCategory.getName())) {
            if (courseCategoryRepository.existsByName(categoryDto.getName())) {
                throw new DuplicateResourceException("CourseCategory", "name", categoryDto.getName());
            }
        }
        
        existingCategory.setName(categoryDto.getName());
        existingCategory.setDescription(categoryDto.getDescription());
        existingCategory.setIcon(categoryDto.getIcon());
        existingCategory.setColor(categoryDto.getColor());
        
        CourseCategory updatedCategory = courseCategoryRepository.save(existingCategory);
        return convertToDto(updatedCategory);
    }

    public void deleteCategory(Long id) {
        if (!courseCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("CourseCategory", "id", id);
        }
        courseCategoryRepository.deleteById(id);
    }

    private CourseCategoryDto convertToDto(CourseCategory category) {
        CourseCategoryDto dto = new CourseCategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setIcon(category.getIcon());
        dto.setColor(category.getColor());
        return dto;
    }

    private CourseCategory convertToEntity(CourseCategoryDto dto) {
        CourseCategory category = new CourseCategory();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setIcon(dto.getIcon());
        category.setColor(dto.getColor());
        return category;
    }
}
