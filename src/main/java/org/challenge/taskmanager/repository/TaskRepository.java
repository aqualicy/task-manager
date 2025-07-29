package org.challenge.taskmanager.repository;

import org.challenge.taskmanager.model.Task;
import org.challenge.taskmanager.model.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    /**
     * Custom query to find tasks by title/description keyword and/or status.
     * Uses a LIKE clause for partial matches in title or description.
     *
     * @param keyword Optional keyword to search in title or description. Can be null or empty.
     * @param status Optional TaskStatus to filter by. Can be null.
     * @param pageable Pagination and sorting information.
     * @return A Page of matching Task entities.
     */
    @Query("SELECT t FROM Task t WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "(:status IS NULL OR t.status = :status)")
    Page<Task> findByKeywordAndStatus(@Param("keyword") String keyword, @Param("status") TaskStatus status, Pageable pageable);
}