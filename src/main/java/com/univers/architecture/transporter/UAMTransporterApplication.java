package com.univers.architecture.transporter;

import com.univers.architecture.transporter.dao.ITaskExecutionRepository;
import com.univers.architecture.transporter.model.TaskExecution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UAMTransporterApplication implements CommandLineRunner{
	
	public static void main(String[] args) {
		SpringApplication.run(UAMTransporterApplication.class, args);
	}
	@Autowired
	private ITaskExecutionRepository taskExecutionRepository;
	
	@Override
	public void run(String... args) throws Exception {
		for(int i=0; i<40; i++) {
			TaskExecution taskExecution = new TaskExecution();
			taskExecution.setTaskConfigName("taskConfigName"+i);
			taskExecution.setDurationInSeconds(1617293989L);
			taskExecution.setStatus(null);
			taskExecution.setTransportedFiles("transportedFiles"+i);
			taskExecution.setMessage("message"+i);
			taskExecution.setEmailErrorSent(false);
			taskExecution.setStartDate(null);
			taskExecution.setEndDate(null);
			taskExecution.setInProgressCopyDetected(false);
            taskExecution.setNbrCheckInProgressCopy(0+i);
			taskExecutionRepository.save(taskExecution);
	}
	}
}