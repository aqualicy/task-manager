package org.challenge.taskmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.challenge.taskmanager.TaskManagerApplication;
import org.challenge.taskmanager.dto.UpdateStatusRequest;
import org.challenge.taskmanager.model.Task;
import org.challenge.taskmanager.model.TaskStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = TaskManagerApplication.class, webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc; // Injects MockMvc to perform HTTP requests

    @Autowired
    private ObjectMapper objectMapper; // Used to convert objects to JSON and vice-versa

    private Task createTask() throws Exception {
        Task newTaskRequest = new Task("New Task Title", "New Task Description", TaskStatus.TODO);
        ResultActions response = mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newTaskRequest)));

        String responseBody = response.andReturn().getResponse().getContentAsString();
        return objectMapper.readValue(responseBody, Task.class);
    }

    @Test
    void createTask_shouldReturnCreatedTaskAndStatus201() throws Exception {
        Task newTaskRequest = new Task("New Task Title", "New Task Description", TaskStatus.TODO);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newTaskRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(newTaskRequest.getTitle()))
                .andExpect(jsonPath("$.description").value(newTaskRequest.getDescription()))
                .andExpect(jsonPath("$.status").value(newTaskRequest.getStatus().toString()));
    }

    @Test
    void getAllTasks_shouldReturnListOfTasksAndStatus200() throws Exception {
        UUID createdTaskId1 = createTask().getId();
        UUID createdTaskId2 = createTask().getId();

        mockMvc.perform(get("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[?(@.id == '%s')]", createdTaskId1.toString()).exists())
                .andExpect(jsonPath("$[?(@.id == '%s')]", createdTaskId2.toString()).exists());
    }

    @Test
    void getTaskById_shouldReturnTaskAndStatus200_whenFound() throws Exception {
        Task createdTask = createTask();
        UUID createdTaskId = createdTask.getId();

        mockMvc.perform(get("/api/tasks/{id}", createdTaskId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(createdTaskId.toString()))
                .andExpect(jsonPath("$.title").value(createdTask.getTitle()));
    }

    @Test
    void getTaskById_shouldReturnNotFoundStatus404_whenNotFound() throws Exception {
        mockMvc.perform(get("/api/tasks/{id}", UUID.randomUUID())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Task not found")));
    }

    @Test
    void updateTask_shouldReturnUpdatedTaskAndStatus200_whenFound() throws Exception {
        UUID createdTaskId = createTask().getId();

        Task updatedTask = new Task("Updated Title", "Updated Desc", TaskStatus.DONE);

        mockMvc.perform(put("/api/tasks/{id}", createdTaskId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(createdTaskId.toString()))
                .andExpect(jsonPath("$.title").value(updatedTask.getTitle()))
                .andExpect(jsonPath("$.status").value(updatedTask.getStatus().toString()));
    }

    @Test
    void updateTask_shouldReturnNotFoundStatus404_whenNotFound() throws Exception {
        mockMvc.perform(put("/api/tasks/{id}", UUID.randomUUID())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new Task())))
                .andExpect(status().isNotFound());
    }

    @Test
    void changeTaskStatus_shouldReturnUpdatedTaskAndStatus200_whenFound() throws Exception {
        UUID createdTaskId = createTask().getId();

        UpdateStatusRequest statusRequest = new UpdateStatusRequest("DONE");

        mockMvc.perform(patch("/api/tasks/{id}/status", createdTaskId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(createdTaskId.toString()))
                .andExpect(jsonPath("$.status").value(TaskStatus.DONE.toString()));
    }

    @Test
    void changeTaskStatus_shouldReturnBadRequestStatus400_whenInvalidStatus() throws Exception {
        UpdateStatusRequest statusRequest = new UpdateStatusRequest("INVALID_STATUS");
        UUID validUUID = UUID.randomUUID();

        mockMvc.perform(patch("/api/tasks/{id}/status", validUUID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Invalid status value")));
    }


    @Test
    void changeTaskStatus_shouldReturnNotFoundStatus404_whenNotFound() throws Exception {
        mockMvc.perform(patch("/api/tasks/{id}/status", UUID.randomUUID())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new UpdateStatusRequest("DONE"))))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteTask_shouldReturnNoContentStatus204_whenFound() throws Exception {
        UUID createdTaskId = createTask().getId();

        mockMvc.perform(delete("/api/tasks/{id}", createdTaskId))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteTask_shouldReturnNotFoundStatus404_whenNotFound() throws Exception {
        mockMvc.perform(delete("/api/tasks/{id}", UUID.randomUUID()))
                .andExpect(status().isNotFound());
    }
}