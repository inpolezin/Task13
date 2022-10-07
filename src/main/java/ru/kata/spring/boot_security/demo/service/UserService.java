package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetails;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> findAllUsers();
    void saveUser(UserDto userDto);
    User findUserById(Long id);
    void updateUser(UserDto userDto);
    void deleteUserById(Long id);
    User findUserByFirstname(String username);
    void init();

}
