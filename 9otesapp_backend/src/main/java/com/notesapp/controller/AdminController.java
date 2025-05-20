package com.notesapp.controller;

import com.notesapp.entity.User;
import com.notesapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api/admin"})
public class AdminController {
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

}
