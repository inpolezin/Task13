package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    List<User> findAll();
    User findUserById(Long id);
    User findByFirstName(String username);
    void deleteById(Long id);
    void save(User user);

}
