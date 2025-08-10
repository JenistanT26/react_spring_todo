package com.todo.todoapp.controller;

import com.todo.todoapp.model.User;
import com.todo.todoapp.repository.UserRepo;
import com.todo.todoapp.services.UserService;
import com.todo.todoapp.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email=credentials.get("email");
        String pass=credentials.get("password");

        var optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>("User not Registered", HttpStatus.UNAUTHORIZED );
        }
        User user= optionalUser.get();
        if(passwordEncoder.matches(pass,user.getPassword())){
            String token=jwtUtil.generateToken(email);
            return ResponseEntity.ok(Map.of("token",token));

        }

        return new ResponseEntity<>("Invalid User", HttpStatus.UNAUTHORIZED );
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> userDetails) {
        // Logic for user registration
        String email=userDetails.get("email");
        String pass=passwordEncoder.encode(userDetails.get("password"));
        if(userRepo.findByEmail(email).isPresent()){
            return new ResponseEntity<>("Email Already Exist", HttpStatus.CONFLICT );
        }
        userService.createUser(User.builder().email(email).password(pass).build());
        return new ResponseEntity<>("SuccesFully Created", HttpStatus.CREATED );
    }

}
