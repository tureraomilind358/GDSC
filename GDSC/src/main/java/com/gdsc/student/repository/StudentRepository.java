package com.gdsc.student.repository;

import com.gdsc.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByUserUsername(String username);
    
    Optional<Student> findByEmail(String email);
    
    List<Student> findByStatus(Student.StudentStatus status);
    
    List<Student> findByEnrollmentDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT s FROM Student s WHERE s.firstName LIKE %:keyword% OR s.lastName LIKE %:keyword% OR s.email LIKE %:keyword%")
    List<Student> searchStudents(@Param("keyword") String keyword);
    
    @Query("SELECT s FROM Student s WHERE s.gender = :gender")
    List<Student> findByGender(@Param("gender") Student.Gender gender);
    
    List<Student> findByCity(String city);
    
    List<Student> findByState(String state);
}
