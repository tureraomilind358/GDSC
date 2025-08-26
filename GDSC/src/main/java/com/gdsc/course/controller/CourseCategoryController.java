package com.gdsc.course.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.course.dto.CourseCategoryDto;
import com.gdsc.course.service.CourseCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course-categories")
@Tag(name = "Course Categories", description = "Course category management APIs")
public class CourseCategoryController {

    @Autowired
    private CourseCategoryService courseCategoryService;

    @GetMapping
    @Operation(summary = "Get all course categories", description = "Retrieve all available course categories")
    public ResponseEntity<ApiResponse<List<CourseCategoryDto>>> getAllCategories() {
        List<CourseCategoryDto> categories = courseCategoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success("Categories retrieved successfully", categories));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get category by ID", description = "Retrieve a specific course category by its ID")
    public ResponseEntity<ApiResponse<CourseCategoryDto>> getCategoryById(@PathVariable Long id) {
        CourseCategoryDto category = courseCategoryService.getCategoryById(id);
        return ResponseEntity.ok(ApiResponse.success("Category retrieved successfully", category));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Create new category", description = "Create a new course category (Admin/Staff only)")
    public ResponseEntity<ApiResponse<CourseCategoryDto>> createCategory(@Valid @RequestBody CourseCategoryDto categoryDto) {
        CourseCategoryDto createdCategory = courseCategoryService.createCategory(categoryDto);
        return ResponseEntity.ok(ApiResponse.success("Category created successfully", createdCategory));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update category", description = "Update an existing course category (Admin/Staff only)")
    public ResponseEntity<ApiResponse<CourseCategoryDto>> updateCategory(
            @PathVariable Long id, 
            @Valid @RequestBody CourseCategoryDto categoryDto) {
        CourseCategoryDto updatedCategory = courseCategoryService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(ApiResponse.success("Category updated successfully", updatedCategory));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete category", description = "Delete a course category (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteCategory(@PathVariable Long id) {
        courseCategoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted successfully"));
    }
}
