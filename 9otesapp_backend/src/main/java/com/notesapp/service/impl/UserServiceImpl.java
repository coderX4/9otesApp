package com.notesapp.service.impl;

import com.notesapp.entity.User;
import com.notesapp.repository.UserRepo;
import com.notesapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepo userRepo;

    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User authenticated(String username, String password) {
        User user = userRepo.findByEmail(username);
        if(!user.getEmail().equals(username)) {
            throw new UsernameNotFoundException("Invalid username");
        }
        if(!bCryptPasswordEncoder.matches(password,user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return user;
    }
}
