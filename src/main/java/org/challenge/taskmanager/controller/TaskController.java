package org.challenge.taskmanager.controller;

import org.challenge.taskmanager.dto.UpdateStatusRequest;
import org.challenge.taskmanager.model.Task;
import org.challenge.taskmanager.model.TaskStatus;
import org.challenge.taskmanager.service.TaskService;
import org.challenge.taskmanager.exception.TaskNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks") // Base path
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Endpoint to create a new task.
     * POST /api/tasks
     * @param task The task object received in the request body.
     * @return ResponseEntity with the created task and HTTP status 201 (Created).
     */
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    /**
     * Endpoint to fetch all tasks.
     * GET /api/tasks
     * @return ResponseEntity with a list of all tasks and HTTP status 200 (OK).
     */
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    /**
     * Endpoint to fetch a task by its ID.
     * GET /api/tasks/{id}
     * @param id The UUID of the task to fetch from the path.
     * @return ResponseEntity with the task and HTTP status 200 (OK), or 404 (Not Found) if task doesn't exist.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable UUID id) {
        return taskService.getTaskById(id)
                .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    /**
     * Endpoint to update an existing task.
     * PUT /api/tasks/{id}
     * @param id The UUID of the task to update from the path.
     * @param updatedTask The task object with updated fields from the request body.
     * @return ResponseEntity with the updated task and HTTP status 200 (OK), or 404 (Not Found) if task doesn't exist.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable UUID id, @Valid @RequestBody Task updatedTask) {
        return taskService.updateTask(id, updatedTask)
                .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    /**
     * Endpoint to change the status of a task.
     * PATCH /api/tasks/{id}/status
     * @param id The UUID of the task to update from the path.
     * @param request The request body containing the new status string.
     * @return ResponseEntity with the updated task and HTTP status 200 (OK), or 404 (Not Found) if task doesn't exist.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> changeTaskStatus(@PathVariable UUID id, @Valid @RequestBody UpdateStatusRequest request) {
        try {
            TaskStatus newStatus = TaskStatus.valueOf(request.getStatus().toUpperCase());
            return taskService.changeTaskStatus(id, newStatus)
                    .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                    .orElseThrow(() -> new TaskNotFoundException(id));
        } catch (IllegalArgumentException e) {
            // This will be caught by GlobalExceptionHandler and return 400 Bad Request
            throw new IllegalArgumentException("Invalid status value: " + request.getStatus() + ". Allowed values are TODO, IN_PROGRESS, DONE.");
        }
    }

    /**
     * Endpoint to delete a task by its ID.
     * DELETE /api/tasks/{id}
     * @param id The UUID of the task to delete from the path.
     * @return ResponseEntity with HTTP status 204 (No Content) if deleted, or 404 (Not Found) if task doesn't exist.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        if (taskService.deleteTask(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new TaskNotFoundException(id);
        }
    }
}