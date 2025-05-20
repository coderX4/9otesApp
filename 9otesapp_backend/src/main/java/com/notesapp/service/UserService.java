package com.notesapp.service;

import com.notesapp.entity.Subject;
import com.notesapp.entity.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    List<User> getAllUsers();
    User authenticated(String username, String password);

    User FindUserByEmail(String email);

    boolean FindGoogleUserByEmail(String email);
}
