package com.gdsc.auth.controller;

import com.gdsc.auth.dto.UserDto;
import com.gdsc.auth.service.UserService;
import com.gdsc.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "User management APIs")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
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


}


