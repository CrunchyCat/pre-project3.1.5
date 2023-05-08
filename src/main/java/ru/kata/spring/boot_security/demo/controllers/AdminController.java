package ru.kata.spring.boot_security.demo.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.util.UserValidator;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;

import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;
    private final UserValidator userValidator;

    @Autowired
    public AdminController(UserService userService, RoleService roleService, UserValidator userValidator) {
        this.userService = userService;
        this.roleService = roleService;
        this.userValidator = userValidator;
    }


    @GetMapping(value = "/users")
    public ResponseEntity<List<UserDTO>> index() {
        return new ResponseEntity<>(userService.findAll().stream()
                .map(this::convertToUserDto)
                .collect(Collectors.toList()),
                HttpStatus.OK);
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> show(@PathVariable("id") int id) {
        return new ResponseEntity<>(convertToUserDto(userService.findOne(id)), HttpStatus.OK);
    }


    @PostMapping(value = "/users", consumes = "application/json")
    public ResponseEntity<User> create(@Valid @RequestBody UserDTO userDTO,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException();
        }

        userService.save(convertToUser(userDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PatchMapping("/users")
    public ResponseEntity<User> update( @Valid @RequestBody UserDTO userDTO,
                        BindingResult bindingResult
    ) {
        if(bindingResult.hasErrors()) {
            throw new IllegalArgumentException();
        }
        userService.update(convertToUser(userDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") int id) {
        User user = userService.findOne(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userService.delete(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    private User convertToUser(UserDTO userDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userDto, User.class);
    }


    private UserDTO convertToUserDto(User user) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(user, UserDTO.class);
    }

}
