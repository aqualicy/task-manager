package org.challenge.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStatusRequest {
    @NotBlank(message = "Status cannot be blank")
    @Pattern(regexp = "TODO|IN_PROGRESS|DONE", message = "Invalid status. Must be TODO, IN_PROGRESS, or DONE")
    private String status;
}