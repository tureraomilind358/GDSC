package com.gdsc.course.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Schema(description = "Course DTO")
public class CourseDto {
    
    @Schema(description = "Course ID")
    private Long id;
    
    @NotBlank(message = "Course name is required")
    @Size(min = 2, max = 100, message = "Course name must be between 2 and 100 characters")
    @Schema(description = "Course name", example = "Java Programming")
    private String name;
    
    @NotBlank(message = "Course description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    @Schema(description = "Course description", example = "Learn Java from basics to advanced")
    private String description;
    
    @Schema(description = "Course image URL", example = "java-course.jpg")
    private String image;
    
    @Schema(description = "Available platforms", example = "[\"Online\", \"Classroom\"]")
    private List<String> platforms;
    
    @NotBlank(message = "Course duration is required")
    @Schema(description = "Course duration", example = "3 months")
    private String duration;
    
    @NotNull(message = "Course fees are required")
    @Positive(message = "Fees must be positive")
    @Schema(description = "Course fees", example = "299.99")
    private BigDecimal fees;
    
    @DecimalMin(value = "0.0", message = "Discount cannot be negative")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    @Schema(description = "Discount percentage", example = "10.0")
    private BigDecimal discount;
    
    @Positive(message = "Maximum students must be positive")
    @Schema(description = "Maximum number of students", example = "50")
    private Integer maxStudents;
    
    @Schema(description = "Published status", example = "true")
    private Boolean isPublished;
    
    @NotNull(message = "Category ID is required")
    @Schema(description = "Course category ID", example = "1")
    private Long categoryId;
    
    @Schema(description = "Center ID", example = "1")
    private Long centerId;
}
