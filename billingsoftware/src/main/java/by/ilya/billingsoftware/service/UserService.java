package by.ilya.billingsoftware.service;

import by.ilya.billingsoftware.io.in.UserRequest;
import by.ilya.billingsoftware.io.out.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}
