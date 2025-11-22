package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // SIGNUP: store password as plain text (OK for project)
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String,String> body){
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");

        System.out.println(">>> SIGNUP request: " + email + " / " + password);

        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println(">>> Email already registered");
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(password);   // plain text

        userRepository.save(u);
        System.out.println(">>> User saved with id = " + u.getId());

        String token = jwtUtil.generateToken(u.getEmail());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id", u.getId(),
                        "name", u.getName(),
                        "email", u.getEmail()
                )
        ));
    }

    // LOGIN: compare plain strings
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body){
        String email = body.get("email");
        String password = body.get("password");

        System.out.println(">>> LOGIN request: " + email + " / " + password);

        Optional<User> opt = userRepository.findByEmail(email);
        if (opt.isEmpty()) {
            System.out.println(">>> No user found with this email");
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid credentials"));
        }

        User u = opt.get();
        System.out.println(">>> DB password = " + u.getPassword());

        if (!u.getPassword().equals(password)) {
            System.out.println(">>> Passwords DO NOT match");
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid credentials"));
        }

        System.out.println(">>> Passwords match – login SUCCESS");

        String token = jwtUtil.generateToken(u.getEmail());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id", u.getId(),
                        "name", u.getName(),
                        "email", u.getEmail()
                )
        ));
    }
}
