package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import ru.kata.spring.boot_security.demo.repositories.UsersRepository;


import java.security.Principal;
import java.util.*;

@Service
@Transactional(readOnly = true)
public class UserServiceImp implements UserService, UserDetailsService {

    private final RoleService roleService;

    private final PasswordEncoder passwordEncoder;

    private final UsersRepository usersRepository;

    @Autowired
    public UserServiceImp(RoleService roleService, PasswordEncoder passwordEncoder, UsersRepository usersRepository) {
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.usersRepository = usersRepository;
    }
    @Override
    public List<User> findAll() {
        return usersRepository.findAll();
    }


    @Override
    public User findOne(int id) {
        Optional<User> foundUser= usersRepository.findById(id);
        return foundUser.orElse(null);
    }

    @Override
    public User getUserFromPrincipal(Principal principal) {
        User user = usersRepository.findByUsername(principal.getName()).get();
        return findOne(user.getId());
    }


    @Override
    @Transactional
    public void save(User user) {
        User userToSave = new User();
        userToSave.setUsername(user.getUsername());
        userToSave.setAge(user.getAge());
        userToSave.setEmail(user.getEmail());
        userToSave.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> rolesJson = user.getRoles();
        Set<Role> rolesDb = new HashSet<>();
        for (Role r : rolesJson) {
            rolesDb.add(roleService.getRoleByName(r.getAuthority()));
        }
        userToSave.setRoles(rolesDb);
        usersRepository.save(userToSave);
    }


    @Override
    @Transactional
    public void update(User updateUser) {
        User userToUpdate = usersRepository.findById(updateUser.getId()).get();
        userToUpdate.setUsername(updateUser.getUsername());
        userToUpdate.setAge(updateUser.getAge());
        userToUpdate.setEmail(updateUser.getEmail());
        userToUpdate.setPassword(passwordEncoder.encode(updateUser.getPassword()));
        userToUpdate.setRoles(updateUser.getRoles());
        usersRepository.save(userToUpdate);
    }


    @Override
    @Transactional
    public void delete(int id) {
        usersRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = usersRepository.findByUsername(username);
        return user.orElseThrow(() -> new UsernameNotFoundException(String.format("User '%s' not  found!", username)));
    }
}
