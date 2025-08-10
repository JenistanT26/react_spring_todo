package com.todo.todoapp.controller;

import com.todo.todoapp.TodoappApplication;
import com.todo.todoapp.model.TodoEntity;
import com.todo.todoapp.services.TodoService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping("")
   public String getAll(){
        // Logic to get all todo items
//        System.out.println(todoService.getTodo());
        return "Welcome to the Todo App!";
    }

    @ApiResponses(value= {
            @ApiResponse(responseCode = "201", description = "Successfully created todo item"),
            @ApiResponse(responseCode = "400", description = "Bad request, invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/create")
    ResponseEntity<TodoEntity> createTodo(@RequestBody TodoEntity todoEntity){
        try{
            TodoEntity createdTodo = todoService.createTodo(todoEntity);
            return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiResponses(value= {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all todo items"),
            @ApiResponse(responseCode = "404", description = "No todo items found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/get")
    ResponseEntity<List<TodoEntity>> getTodo() {
        try{
            List<TodoEntity> createdTodo = todoService.getTodo();
            System.out.println("Sending todos: " + createdTodo);
            return new ResponseEntity<>(createdTodo, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ApiResponses(value= {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved todo item by ID"),
            @ApiResponse(responseCode = "404", description = "Todo item not found with the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{id}")
    ResponseEntity<TodoEntity> getTodoById(@PathVariable long id) {
        try{
            TodoEntity createdTodo = todoService.getTodoById(id);
            return new ResponseEntity<>(createdTodo, HttpStatus.FOUND);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @ApiResponses(value= {
            @ApiResponse(responseCode = "200", description = "Successfully updated todo item"),
            @ApiResponse(responseCode = "404", description = "Todo item not found with the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/update")
    ResponseEntity<TodoEntity> updateTodo(@RequestBody TodoEntity todoEntity) {
        try{
            TodoEntity updatedTodo = todoService.updateTodo(todoEntity);
            return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ApiResponses(value= {
            @ApiResponse(responseCode = "200", description = "Successfully deleted todo item"),
            @ApiResponse(responseCode = "404", description = "Todo item not found with the given ID"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/delete/{id}")
    ResponseEntity<TodoEntity> deleteTodo(@PathVariable long id){
        try{
            TodoEntity deletedTodo = todoService.deleteTodo(id);
            return new ResponseEntity<>(deletedTodo, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
