package com.gdsc.controller;

import com.gdsc.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/simple")
public class SimpleController {

    @GetMapping("/test")
    public ApiResponse<String> test() {
        return ApiResponse.success("Simple endpoint working!");
    }
    
    @GetMapping("/courses")
    public ApiResponse<String> courses() {
        return ApiResponse.success("Courses endpoint working!");
    }
    
    @GetMapping("/students")
    public ApiResponse<String> students() {
        return ApiResponse.success("Students endpoint working!");
    }
}
