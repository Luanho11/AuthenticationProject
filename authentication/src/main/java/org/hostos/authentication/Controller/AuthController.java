package org.hostos.authentication.Controller;

import org.hostos.authentication.DTO.AuthResponse;
import org.hostos.authentication.DTO.ChangePasswordDTO;
import org.hostos.authentication.DTO.LoginDTO;
import org.hostos.authentication.DTO.RegisterDTO;
import org.hostos.authentication.Service.AuthService;
import org.hostos.authentication.Service.UserService;
import org.hostos.authentication.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterDTO dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

    @GetMapping(value = "profile")
    public ResponseEntity<User> getProfile() {
        return userService.getUserProfile()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping(value = "updateprofile")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser) {
        User user = userService.updateUserProfile(updatedUser);
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "change-password")
    public String changePassword(@RequestBody ChangePasswordDTO request) {
        try {
            authService.changePassword(request.getEmail(), request.getCurrentPassword(), request.getNewPassword());
            return "Password changed successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error changing password: " + e.getMessage();
        }
    }

    @PostMapping(value = "/verify-password")
    public ResponseEntity<Void> verifyPassword(@RequestBody ChangePasswordDTO request) {
        try {
            authService.verifyPassword(request.getEmail(), request.getCurrentPassword());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}