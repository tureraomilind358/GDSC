package com.gdsc.auth.service;

import com.gdsc.auth.dto.UserDto;
import com.gdsc.auth.entity.Role;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhone(user.getPhone());
        dto.setIsEnabled(user.getIsEnabled());
        dto.setIsAccountNonExpired(user.getIsAccountNonExpired());
        dto.setIsAccountNonLocked(user.getIsAccountNonLocked());
        dto.setIsCredentialsNonExpired(user.getIsCredentialsNonExpired());
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .map(Enum::name)
                .collect(Collectors.toSet());
        dto.setRoles(roleNames);
        dto.setCenterId(user.getCenter() != null ? user.getCenter().getId() : null);
        return dto;
    }
}


