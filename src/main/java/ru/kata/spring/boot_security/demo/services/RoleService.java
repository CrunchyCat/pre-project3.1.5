package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.Role;

import java.util.List;


public interface RoleService {
    Role findOne(int id);

    Role getRoleByName(String name);

    List<Role> findAll();

}
