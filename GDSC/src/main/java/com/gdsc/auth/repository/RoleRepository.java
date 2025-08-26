package com.gdsc.auth.repository;

import com.gdsc.auth.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(Role.RoleType name);
    
    boolean existsByName(Role.RoleType name);
}
