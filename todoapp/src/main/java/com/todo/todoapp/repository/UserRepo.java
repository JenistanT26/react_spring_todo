package com.todo.todoapp.repository;

import com.todo.todoapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
    // This interface will automatically provide CRUD operations for User
    // Additional custom methods can be defined here if needed
    Optional<User> findByEmail(String email); // Custom method to find user by email
    boolean existsByEmail(String email); // Custom method to check if user exists by email
    void deleteByEmail(String email); // Custom method to delete user by email
    Optional<User> findByEmailAndPassword(String email, String password); // Custom method to find user by email and password
    Optional<User> findById(long id); // Custom method to find user by id
    boolean existsById(long id); // Custom method to check if user exists by id
    void deleteById(long id); // Custom method to delete user by id
}
