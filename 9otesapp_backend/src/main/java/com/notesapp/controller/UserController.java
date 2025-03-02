package com.notesapp.controller;

import com.notesapp.entity.User;
import com.notesapp.security.GoogleLoginRequest;
import com.notesapp.security.LoginRequest;
import com.notesapp.security.UserSession;
import com.notesapp.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api/user"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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
                UserSession userSession = new UserSession(authenticatedUser.getId(), authenticatedUser.getUname(), loginRequest.getEmail(), loginRequest.getPassword());

                session.setAttribute("user", userSession); // Store user in session
                return ResponseEntity.ok(userSession); // Send user details to client
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid email or password\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"An Unexpected error occurred\"}");
        }
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> getOAuthUser(@RequestBody GoogleLoginRequest googleLoginRequest, HttpSession session) {
        try {
            boolean isPresent = userService.FindGoogleUserByEmail(googleLoginRequest.getEmail());
            System.out.println("User Exists: " + isPresent); // Debugging log

            if (isPresent) {
                User user = userService.FindUserByEmail(googleLoginRequest.getEmail());
                UserSession userSession = new UserSession(user.getId(), user.getUname(), user.getEmail(), "GOOGLE_AUTH");
                session.setAttribute("user", userSession);
                return ResponseEntity.ok(userSession);
            }
            else {

                User newuser = new User();
                // If ID is auto-generated in the database, remove this line
                newuser.setUname(googleLoginRequest.getUname());
                newuser.setEmail(googleLoginRequest.getEmail());
                newuser.setPassword("GOOGLE_AUTH"); // Use placeholder for OAuth

                userService.saveUser(newuser); // Save new user

                UserSession userSession = new UserSession(newuser.getId(), newuser.getUname(), newuser.getEmail(), "GOOGLE_AUTH");

                session.setAttribute("user", userSession);
                return ResponseEntity.ok(userSession);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"An Unexpected error occurred\"}");
        }
    }

}
