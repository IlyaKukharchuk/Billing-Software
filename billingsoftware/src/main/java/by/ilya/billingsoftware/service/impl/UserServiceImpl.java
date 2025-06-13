package by.ilya.billingsoftware.service.impl;

import by.ilya.billingsoftware.entity.UserEntity;
import by.ilya.billingsoftware.entity.enums.Role;
import by.ilya.billingsoftware.io.in.UserRequest;
import by.ilya.billingsoftware.io.out.UserResponse;
import by.ilya.billingsoftware.repository.UserRepository;
import by.ilya.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        System.out.println("saved user: " + newUser);
        return convertToDto(newUser);
    }

    @Override
    public String getUserRole(String email) {
         UserEntity userEntity =userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found by that email: " + email));
        return userEntity.getRole().toString();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(()-> new UsernameNotFoundException("User not found by that id: " + id));
        userRepository.delete(existingUser);
    }
    private UserResponse convertToDto(UserEntity newUser) {
        return UserResponse.builder()
                .userId(newUser.getUserId())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .password(newUser.getPassword())
                .role(newUser.getRole().toString())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .build();
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleDetector(request.getRole().toUpperCase()))
                .name(request.getName())
                .build();
    }

    private Role roleDetector(String role) {
        if (role == null) {
            return Role.USER; // Дефолтная роль
        }
        return Role.valueOf(role.toUpperCase());
    }
}
