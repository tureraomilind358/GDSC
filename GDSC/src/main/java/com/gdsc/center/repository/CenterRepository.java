package com.gdsc.center.repository;

import com.gdsc.center.entity.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {
    
    Optional<Center> findByCode(String code);
    
    Optional<Center> findByName(String name);
    
    @Query("SELECT c FROM Center c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.code) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.city) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Center> searchCenters(@Param("keyword") String keyword);
    
    List<Center> findByStatus(String status);
    
    List<Center> findByCity(String city);
    
    List<Center> findByState(String state);
}
