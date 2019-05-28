package com.sha.microservicelogmanagement.repository;

import com.sha.microservicelogmanagement.model.Log;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface LogRepository extends CrudRepository<Log, UUID> {
}
