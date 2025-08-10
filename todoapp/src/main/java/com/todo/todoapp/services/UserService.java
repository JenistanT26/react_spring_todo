package com.todo.todoapp.services;

import com.todo.todoapp.model.User;
import com.todo.todoapp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    // This service can be used to manage user-related operations
    // For example, user registration, authentication, etc.
    // Currently, it is empty but can be expanded as needed.
    // You can inject repositories or other services here to implement user-related logic.
    @Autowired
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }
    public User getUserById(long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

}
