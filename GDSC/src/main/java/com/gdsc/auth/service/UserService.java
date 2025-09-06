package com.gdsc.auth.service;

import com.gdsc.auth.dto.UserDto;
import com.gdsc.auth.entity.Role;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.repository.RoleRepository;
import com.gdsc.auth.repository.UserRepository;
import com.gdsc.common.exception.DuplicateResourceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getAllUserByUserName(String username) {
        Optional<User> byUsername = userRepository.findByUsername(username);
        return byUsername.stream()
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

    public UserDto saveUser(UserDto userDto) {
        // Validate for duplicate username
        if (userDto.getUsername() != null && userRepository.existsByUsername(userDto.getUsername())) {
            throw new DuplicateResourceException("User", "username", userDto.getUsername());
        }
        
        // Validate for duplicate email
        if (userDto.getEmail() != null && userRepository.existsByEmail(userDto.getEmail())) {
            throw new DuplicateResourceException("User", "email", userDto.getEmail());
        }
        
        User usr = convertToEntity(userDto);
        User savedUser = userRepository.save(usr);
        UserDto usrDto = convertToDto(savedUser);
        return usrDto;
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToDto(user);
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        // Validate for duplicate username (only if username is being changed)
        if (userDto.getUsername() != null && !userDto.getUsername().equals(existingUser.getUsername())) {
            if (userRepository.existsByUsername(userDto.getUsername())) {
                throw new DuplicateResourceException("User", "username", userDto.getUsername());
            }
        }
        
        // Validate for duplicate email (only if email is being changed)
        if (userDto.getEmail() != null && !userDto.getEmail().equals(existingUser.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new DuplicateResourceException("User", "email", userDto.getEmail());
            }
        }
        
        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setPhone(userDto.getPhone());
        existingUser.setIsEnabled(userDto.getIsEnabled());
        
        if (userDto.getCenterId() != null) {
            com.gdsc.center.entity.Center center = new com.gdsc.center.entity.Center();
            center.setId(userDto.getCenterId());
            existingUser.setCenter(center);
        }
        
        User updatedUser = userRepository.save(existingUser);
        return mapToDto(updatedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public List<UserDto> getUsersByCenterId(Long centerId) {
        List<User> users = userRepository.findByCenterId(centerId);
        return users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private UserDto convertToDto(User savedUser) {
        if (savedUser == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(savedUser.getId());
        userDto.setUsername(savedUser.getUsername());
        userDto.setEmail(savedUser.getEmail());
        userDto.setFirstName(savedUser.getFirstName());
        userDto.setLastName(savedUser.getLastName());
        userDto.setPhone(savedUser.getPhone());
        userDto.setIsEnabled(savedUser.getIsEnabled());
        userDto.setIsAccountNonExpired(savedUser.getIsAccountNonExpired());
        userDto.setIsAccountNonLocked(savedUser.getIsAccountNonLocked());
        userDto.setIsCredentialsNonExpired(savedUser.getIsCredentialsNonExpired());

        // Convert Set<Role> → Set<String> (RoleType name as string)
        if (savedUser.getRoles() != null) {
            userDto.setRoles(
                    savedUser.getRoles().stream()
                            .map(role -> role.getName().name()) // RoleType → String
                            .collect(java.util.stream.Collectors.toSet())
            );
        }

        if (savedUser.getCenter() != null) {
            userDto.setCenterId(savedUser.getCenter().getId());
        }

        return userDto;
    }

    private User convertToEntity(UserDto userDto) {
        if (userDto == null) return null;

        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhone(userDto.getPhone());
        user.setIsEnabled(userDto.getIsEnabled() != null ? userDto.getIsEnabled() : true);
        user.setIsAccountNonExpired(userDto.getIsAccountNonExpired() != null ? userDto.getIsAccountNonExpired() : true);
        user.setIsAccountNonLocked(userDto.getIsAccountNonLocked() != null ? userDto.getIsAccountNonLocked() : true);
        user.setIsCredentialsNonExpired(userDto.getIsCredentialsNonExpired() != null ? userDto.getIsCredentialsNonExpired() : true);

        // ✅ Fetch roles from DB (managed entities)
        if (userDto.getRoles() != null) {
            Set<Role> roles = userDto.getRoles().stream()
                    .map(roleStr -> roleRepository.findByName(Role.RoleType.valueOf(roleStr))
                            .orElseThrow(() -> new RuntimeException("Role not found: " + roleStr)))
                    .collect(java.util.stream.Collectors.toSet());
            user.setRoles(roles);
        }

        // ✅ Handle center mapping
        if (userDto.getCenterId() != null) {
            com.gdsc.center.entity.Center center = new com.gdsc.center.entity.Center();
            center.setId(userDto.getCenterId());
            user.setCenter(center);
        }

        return user;
    }


}


