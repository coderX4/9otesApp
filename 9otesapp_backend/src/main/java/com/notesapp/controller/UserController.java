package com.notesapp.controller;

import com.notesapp.entity.User;
import com.notesapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/user"})
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping({"/adduser"})
    public String addUser(@RequestBody User user) {
        userService.saveUser(user);
        return "User added";
    }

    @GetMapping("/getAllUser")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }
}
