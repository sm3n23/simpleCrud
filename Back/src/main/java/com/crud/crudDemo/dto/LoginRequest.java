package com.crud.crudDemo.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;

    // getters and setters
}