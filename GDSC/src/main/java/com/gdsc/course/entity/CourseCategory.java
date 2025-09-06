package com.gdsc.course.entity;

import com.gdsc.common.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "course_categories")
@EqualsAndHashCode(callSuper = true)
public class CourseCategory extends BaseEntity {

    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 100, message = "Category name must be between 2 and 100 characters")
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description")
    private String description;

    @Column(name = "icon")
    private String icon;

    @Column(name = "color")
    private String color;
//
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Course> courses = new ArrayList<>();

}
