package com.todo.todoapp.services;

import com.todo.todoapp.model.TodoEntity;
import com.todo.todoapp.repository.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoRepo todoRepo;

    //creating todo
    public TodoEntity createTodo(TodoEntity todoEntity){
        return todoRepo.save(todoEntity);
    }

    //getting all todos
   public List<TodoEntity> getTodo(){
       return todoRepo.findAll();
   }

   //getting todo by id
    public TodoEntity getTodoById(long id){
        return todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    //updating todo
    public TodoEntity updateTodo(TodoEntity todoEntity) {
        if (todoEntity.getId() == null || !todoRepo.existsById(todoEntity.getId())) {
            throw new RuntimeException("Todo not found with id: " + todoEntity.getId());
        }
        return todoRepo.save(todoEntity);
    }

    public TodoEntity deleteTodo(long id) {
        TodoEntity todoEntity = getTodoById(id);
        todoRepo.delete(todoEntity);
        return todoEntity;
    }
}
