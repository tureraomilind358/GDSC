package com.gdsc.course.repository;

import com.gdsc.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    @Query("SELECT c FROM Course c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Course> searchCourses(@Param("keyword") String keyword);
    
    List<Course> findByCategoryId(Long categoryId);
    
    List<Course> findByCenterId(Long centerId);
    
    List<Course> findByIsPublished(Boolean isPublished);
    
    List<Course> findByCategoryIdAndIsPublished(Long categoryId, Boolean isPublished);
}
