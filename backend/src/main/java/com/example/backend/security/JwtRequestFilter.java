package com.example.backend.security;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

            String username = null;
            String jwt = null;

            // Extract token from "Bearer <token>"
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring(7);
                try {
                    username = jwtUtil.getUsernameFromToken(jwt);
                } catch (Exception e) {
                    System.out.println("JWT parsing error: " + e.getMessage());
                }
            }

            // If we got a username and no authentication yet, validate token
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Optional<User> opt = userRepository.findByEmail(username);
                if (opt.isPresent() && jwtUtil.validateToken(jwt)) {
                    User u = opt.get();

                    UserDetails userDetails =
                            org.springframework.security.core.userdetails.User
                                    .withUsername(u.getEmail())
                                    .password(u.getPassword())
                                    .authorities("USER")
                                    .build();

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Never break the request because of JWT errors
            System.out.println("JwtRequestFilter error: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
