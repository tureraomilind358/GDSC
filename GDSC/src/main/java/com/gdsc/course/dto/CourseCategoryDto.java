package com.gdsc.course.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Course Category DTO")
public class CourseCategoryDto {
    
    @Schema(description = "Category ID")
    private Long id;
    
    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
    @Schema(description = "Category name", example = "Information Technology")
    private String name;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Schema(description = "Category description", example = "IT related courses")
    private String description;
    
    @Schema(description = "Category icon", example = "fas fa-laptop-code")
    private String icon;
    
    @Schema(description = "Category color", example = "#007bff")
    private String color;
}
