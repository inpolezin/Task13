package ru.kata.spring.boot_security.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.*;
import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class UserDto {
    private Long id;

    private String firstName;

    private String lastName;

    private Integer age;

    private String email;

    private String password;

    private List<Long> roleIds;
}
