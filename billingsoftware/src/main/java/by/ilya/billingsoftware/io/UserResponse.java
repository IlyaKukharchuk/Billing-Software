package by.ilya.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String userId;
    private String name;
    private String email;
    private String password;
    private String role;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
