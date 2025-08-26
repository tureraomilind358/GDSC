package com.gdsc.auth.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Boolean isEnabled;
    private Boolean isAccountNonExpired;
    private Boolean isAccountNonLocked;
    private Boolean isCredentialsNonExpired;
    private Set<String> roles;
    private Long centerId;
}


