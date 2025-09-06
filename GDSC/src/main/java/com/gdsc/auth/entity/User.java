package com.gdsc.auth.entity;

import com.gdsc.common.entity.BaseEntity;
import com.gdsc.center.entity.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "is_enabled", nullable = false)
    private Boolean isEnabled = true;

    @Column(name = "is_account_non_expired", nullable = false)
    private Boolean isAccountNonExpired = true;

    @Column(name = "is_account_non_locked", nullable = false)
    private Boolean isAccountNonLocked = true;

    @Column(name = "is_credentials_non_expired", nullable = false)
    private Boolean isCredentialsNonExpired = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;
    
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<com.gdsc.teacher.entity.Teacher> teachers = new HashSet<>();
    
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<com.gdsc.student.entity.Student> students = new HashSet<>();

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
    }
    
    public void addTeacher(com.gdsc.teacher.entity.Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setUser(this);
    }
    
    public void removeTeacher(com.gdsc.teacher.entity.Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setUser(null);
    }
    
    public void addStudent(com.gdsc.student.entity.Student student) {
        this.students.add(student);
        student.setUser(this);
    }

    public void removeStudent(com.gdsc.student.entity.Student student) {
        this.students.remove(student);
        student.setUser(null);
    }
}
