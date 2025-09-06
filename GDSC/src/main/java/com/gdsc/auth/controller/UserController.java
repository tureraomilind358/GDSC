package com.gdsc.auth.controller;

import com.gdsc.auth.dto.UserDto;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.service.UserService;
import com.gdsc.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "User management APIs")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER') or hasRole('STUDENT')")
    @Operation(summary = "Get all users", description = "Retrieve all users (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER')")
    @Operation(summary = "Get USER By UserName", description = "Retrieve all users (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUserByUserName(@PathVariable String username) {
        List<UserDto> users = userService.getAllUserByUserName(username);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @GetMapping("/id/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER')")
    @Operation(summary = "Get User by ID", description = "Retrieve user by ID")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", user));
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER')")
    @Operation(summary = "Create User", description = "Create a new user")
    public ResponseEntity<ApiResponse<UserDto>> saveUser(@Valid @RequestBody UserDto userDto) {
        UserDto receivedUserDto = userService.saveUser(userDto);
        return ResponseEntity.ok(ApiResponse.success("User created successfully", receivedUserDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER')")
    @Operation(summary = "Update User", description = "Update an existing user")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", updatedUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Delete User", description = "Delete a user by ID")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", "User with ID " + id + " has been deleted"));
    }

    @GetMapping("/center/{centerId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER')")
    @Operation(summary = "Get Users by Center ID", description = "Fetch all users belonging to a specific center")
    public ResponseEntity<ApiResponse<List<UserDto>>> getUsersByCenterId(@PathVariable Long centerId) {
        List<UserDto> users = userService.getUsersByCenterId(centerId);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }
}


