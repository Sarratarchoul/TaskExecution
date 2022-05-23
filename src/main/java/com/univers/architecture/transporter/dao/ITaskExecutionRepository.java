/**
 * 
 */
package com.univers.architecture.transporter.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.univers.architecture.transporter.model.TaskExecution;

/**
 * @author sabir
 *
 */
public interface ITaskExecutionRepository extends PagingAndSortingRepository<TaskExecution, String> {

    @Query("FROM TaskExecution t WHERE t.taskConfigName OR t.status  OR t.message  OR t.emailErrorSent  ORDER BY t.id ASC")
    Page<TaskExecution> findAllTasks(Pageable pageable, @Param("searchtext")String searchtext);
}
