package org.challenge.taskmanager.service;

import org.challenge.taskmanager.model.Task;
import org.challenge.taskmanager.model.TaskStatus;
import org.challenge.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Creates a new task.
     * @param task The task object to create.
     * @return The created task with its generated ID (handled by JPA).
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Fetches all tasks.
     * @return A list of all tasks.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Fetches a task by its ID.
     * @param id The UUID of the task to fetch.
     * @return An Optional containing the task if found, or empty if not found.
     */
    public Optional<Task> getTaskById(UUID id) {
        return taskRepository.findById(id);
    }

    /**
     * Updates an existing task.
     * @param id The UUID of the task to update.
     * @param updatedTask The task object with updated fields.
     * @return An Optional containing the updated task if found and updated, or empty if not found.
     */
    public Optional<Task> updateTask(UUID id, Task updatedTask) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(updatedTask.getTitle());
            if (updatedTask.getDescription() != null) {
                existingTask.setDescription(updatedTask.getDescription());
            }
            existingTask.setStatus(updatedTask.getStatus());
            return taskRepository.save(existingTask);
        });
    }

    /**
     * Changes the status of a task.
     * @param id The UUID of the task to update.
     * @param newStatus The new status for the task.
     * @return An Optional containing the updated task if found and status changed, or empty if not found.
     */
    public Optional<Task> changeTaskStatus(UUID id, TaskStatus newStatus) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setStatus(newStatus);
            return taskRepository.save(existingTask);
        });
    }

    /**
     * Deletes a task by its ID.
     * @param id The UUID of the task to delete.
     * @return True if the task was found and deleted, false otherwise.
     */
    public boolean deleteTask(UUID id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
}