/**
 * 
 */
package com.univers.architecture.transporter.web;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.univers.architecture.transporter.model.TaskExecution;
import com.univers.architecture.transporter.service.ITaskExecutionService;

/**
 * @author sabir
 *
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000")
public class TaskExecutionController {

	@Autowired
	private ITaskExecutionService taskExecutionService;

	@GetMapping("/taskExecutions/search")
	public Page<TaskExecution> findAll(Pageable pageable,@PathVariable String searchtext) {
		return taskExecutionService.findAll(pageable, searchtext);
	}
	@GetMapping("/taskExecutions")
	public Page<TaskExecution> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return taskExecutionService.findAll(PageRequest.of(
			pageNumber, pageSize,
			sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
		));
	}
}
