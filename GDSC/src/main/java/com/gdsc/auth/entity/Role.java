package com.gdsc.auth.entity;

import com.gdsc.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "roles")
@EqualsAndHashCode(callSuper = true)
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false, unique = true)
    private RoleType name;

    @Column(name = "description")
    private String description;

    public enum RoleType {
        ADMIN,
        TEACHER,
        STUDENT,
        STAFF,
        CENTER
    }
}
