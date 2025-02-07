package com.notesapp.controller;

import com.notesapp.entity.LoginRequest;
import com.notesapp.entity.User;
import com.notesapp.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api/user"})
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping({"/adduser"})
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @GetMapping("/getAllUser")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @PostMapping({"/login"})
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            User authenticatedUser = userService.authenticated(loginRequest.getEmail(), loginRequest.getPassword());

            if (authenticatedUser != null) {
                session.setAttribute("user", loginRequest); // Store user in session
                return ResponseEntity.ok(loginRequest); // Send user details to client
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid email or password\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"An Unexpected error occurred\"}");
        }
    }

}
