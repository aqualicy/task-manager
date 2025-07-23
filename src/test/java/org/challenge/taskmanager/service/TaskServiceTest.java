package org.challenge.taskmanager.service;

import org.challenge.taskmanager.model.Task;
import org.challenge.taskmanager.model.TaskStatus;
import org.challenge.taskmanager.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task1;
    private Task task2;
    private UUID uuid1;
    private UUID uuid2;

    @BeforeEach
    void setUp() {
        uuid1 = UUID.fromString("11111111-1111-1111-1111-111111111111");
        uuid2 = UUID.fromString("22222222-2222-2222-2222-222222222222");

        task1 = new Task(uuid1, "Task One", "Description for task one", TaskStatus.TODO);
        task2 = new Task(uuid2, "Task Two", "Description for task two", TaskStatus.IN_PROGRESS);
    }

    @Test
    void createTask_shouldReturnCreatedTask() {
        when(taskRepository.save(any(Task.class))).thenReturn(task1);

        Task newTask = new Task("New Task", "New Description", TaskStatus.TODO);
        Task createdTask = taskService.createTask(newTask);

        assertAll(
            () -> assertNotNull(createdTask),
            () -> assertEquals(task1.getId(), createdTask.getId()),
            () -> assertEquals(task1.getTitle(), createdTask.getTitle()),
            () -> assertEquals(task1.getDescription(), createdTask.getDescription()),
            () -> assertEquals(task1.getStatus(), createdTask.getStatus())
        );
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getAllTasks_shouldReturnListOfTasks() {
        List<Task> tasks = Arrays.asList(task1, task2);
        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> result = taskService.getAllTasks();

        assertAll(
            () -> assertNotNull(result),
            () -> assertEquals(2, result.size()),
            () -> assertEquals(task1, result.get(0)),
            () -> assertEquals(task2, result.get(1))
        );

        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void getTaskById_shouldReturnTask_whenFound() {
        when(taskRepository.findById(uuid1)).thenReturn(Optional.of(task1));

        Optional<Task> result = taskService.getTaskById(uuid1);

        assertTrue(result.isPresent());
        assertEquals(task1, result.get());
        verify(taskRepository, times(1)).findById(uuid1);
    }

    @Test
    void getTaskById_shouldReturnEmptyOptional_whenNotFound() {
        when(taskRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        Optional<Task> result = taskService.getTaskById(UUID.randomUUID());

        assertFalse(result.isPresent());
        verify(taskRepository, times(1)).findById(any(UUID.class));
    }

    @Test
    void updateTask_shouldReturnUpdatedTask_whenFound() {
        Task updatedInfo = new Task(uuid1, "Updated Task One", "Updated Description", TaskStatus.DONE);

        when(taskRepository.findById(uuid1)).thenReturn(Optional.of(task1));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedInfo);

        Optional<Task> result = taskService.updateTask(uuid1, updatedInfo);

        assertTrue(result.isPresent());
        Task returnedTask = result.get();

        assertAll(
                () -> assertEquals(updatedInfo.getTitle(), returnedTask.getTitle()),
                () -> assertEquals(updatedInfo.getDescription(), returnedTask.getDescription()),
                () -> assertEquals(updatedInfo.getStatus(), returnedTask.getStatus())
        );

        verify(taskRepository, times(1)).findById(uuid1);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void updateTask_shouldReturnEmptyOptional_whenNotFound() {
        when(taskRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        Optional<Task> result = taskService.updateTask(UUID.randomUUID(), new Task());

        assertFalse(result.isPresent());
        verify(taskRepository, times(1)).findById(any(UUID.class));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void changeTaskStatus_shouldUpdateStatus_whenFound() {
        task1.setStatus(TaskStatus.TODO);

        when(taskRepository.findById(uuid1)).thenReturn(Optional.of(task1));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Optional<Task> result = taskService.changeTaskStatus(uuid1, TaskStatus.DONE);

        assertTrue(result.isPresent());
        assertEquals(TaskStatus.DONE, result.get().getStatus());
        verify(taskRepository, times(1)).findById(uuid1);
        verify(taskRepository, times(1)).save(task1);
    }

    @Test
    void changeTaskStatus_shouldReturnEmptyOptional_whenNotFound() {
        when(taskRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        Optional<Task> result = taskService.changeTaskStatus(UUID.randomUUID(), TaskStatus.DONE);

        assertFalse(result.isPresent());
        verify(taskRepository, times(1)).findById(any(UUID.class));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void deleteTask_shouldReturnTrue_whenFound() {
        when(taskRepository.existsById(uuid1)).thenReturn(true);

        boolean result = taskService.deleteTask(uuid1);

        assertTrue(result);
        verify(taskRepository, times(1)).existsById(uuid1);
        verify(taskRepository, times(1)).deleteById(uuid1);
    }

    @Test
    void deleteTask_shouldReturnFalse_whenNotFound() {
        when(taskRepository.existsById(any(UUID.class))).thenReturn(false);

        boolean result = taskService.deleteTask(UUID.randomUUID());

        assertFalse(result);
        verify(taskRepository, times(1)).existsById(any(UUID.class));
        verify(taskRepository, never()).deleteById(any(UUID.class));
    }
}