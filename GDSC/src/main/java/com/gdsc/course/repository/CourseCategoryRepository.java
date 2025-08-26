package com.gdsc.course.repository;

import com.gdsc.course.entity.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseCategoryRepository extends JpaRepository<CourseCategory, Long> {

    Optional<CourseCategory> findByName(String name);
    
    boolean existsByName(String name);
}
