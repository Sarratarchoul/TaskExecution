/**
 * 
 */
package com.univers.architecture.transporter.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.univers.architecture.transporter.model.TaskExecution;

/**
 * @author sabir
 *
 */
public interface ITaskExecutionService {

	Page<TaskExecution> findAll(Pageable pageable);
	Page<TaskExecution> findAll(Pageable pageable, String searchtext);
}
