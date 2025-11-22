package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
=======
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
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

<<<<<<< HEAD
    // SIGNUP: store password as plain text (OK for project)
=======
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String,String> body){
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");

<<<<<<< HEAD
        System.out.println(">>> SIGNUP request: " + email + " / " + password);

        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println(">>> Email already registered");
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already registered"));
=======
        if(userRepository.findByEmail(email).isPresent()){
            return ResponseEntity.badRequest().body(Map.of("message","Email already registered"));
>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
        }

        User u = new User();
        u.setName(name);
        u.setEmail(email);
<<<<<<< HEAD
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
=======
        u.setPassword(passwordEncoder.encode(password));
        userRepository.save(u);

        String token = jwtUtil.generateToken(u.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "name", u.getName(), "email", u.getEmail())));
    }

>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body){
        String email = body.get("email");
        String password = body.get("password");
<<<<<<< HEAD

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
=======
        Optional<User> opt = userRepository.findByEmail(email);
        if(opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
        User u = opt.get();
        if(!passwordEncoder.matches(password, u.getPassword())){
            return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
        }
        String token = jwtUtil.generateToken(u.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "name", u.getName(), "email", u.getEmail())));
>>>>>>> 80f9e57715b420c978ff74e0bae77a9dcd115c44
    }
}
