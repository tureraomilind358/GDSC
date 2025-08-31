package com.gdsc.center.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CenterRegistrationRequest {

    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @NotBlank
    @Size(max = 500)
    private String address;

    @NotBlank
    @Size(max = 100)
    private String city;

    @NotBlank
    @Size(max = 100)
    private String state;

    @Size(max = 10)
    private String postalCode;

    @NotBlank
    @Size(max = 100)
    private String country;

    @Email
    @NotBlank
    private String email;

    @NotNull
    @Positive
    private Integer capacity;
}


