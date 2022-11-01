package ru.kata.spring.boot_security.demo.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));

        List<Role> roles = new ArrayList<>();
        List<Long> roleIds = userDto.getRoleIds();
        for (int i = 0; i < roleIds.size(); i++) {
            roles.add(roleRepository.findRoleById(roleIds.get(i)));
        }
        user.setRoles(roles);
        userRepository.save(user);
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    @Transactional
    public void updateUser(UserDto userDto) {
        User user = findUserById(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(userDto.getPassword()));

        List<Role> roles = new ArrayList<>();
        List<Long> roleIds = userDto.getRoleIds();
        for (int i = 0; i < roleIds.size(); i++) {
            roles.add(roleRepository.findRoleById(roleIds.get(i)));
        }
        user.setRoles(roles);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findUserByFirstname(String username) {
        return userRepository.findByFirstName(username);
    }

    @Override
    public UserDetails loadUserByUsername(String s) {
        User user = userRepository.findByFirstName(s);
        if(user == null){
            throw new UsernameNotFoundException("user not found");
        }
        return user;
    }

    @PostConstruct
    @Override
    @Transactional
    public void init() {
        if(roleRepository.empty()) {
            Role roleAdmin = new Role();
            roleAdmin.setName("ROLE_ADMIN");
            Role roleUser = new Role();
            roleUser.setName("ROLE_USER");
            roleRepository.save(roleAdmin);
            roleRepository.save(roleUser);
            List<Role> rolesForAdmin = new ArrayList<>();
            List<Role> rolesForUser = new ArrayList<>();
            rolesForAdmin.add(roleAdmin);
            rolesForAdmin.add(roleUser);
            rolesForUser.add(roleUser);
            User admin = new User();
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setAge(21);
            admin.setEmail("admin");
            admin.setPassword(new BCryptPasswordEncoder().encode("123"));
            admin.setRoles(rolesForAdmin);
            User user = new User ();
            user.setFirstName("user");
            user.setLastName("user");
            user.setAge(21);
            user.setEmail("user");
            user.setPassword(new BCryptPasswordEncoder().encode("123"));
            user.setRoles(rolesForUser);
            userRepository.save(admin);
            userRepository.save(user);
        }
    }
}
