package com.todo.todoapp.repository;

import com.todo.todoapp.model.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<TodoEntity, Long> {
    // This interface will automatically provide CRUD operations for TodoEntity
    // Additional custom methods can be defined here if needed
}
