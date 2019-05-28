package com.sha.microservicelogmanagement.service;

import com.sha.microservicelogmanagement.model.Log;
import com.sha.microservicelogmanagement.model.Summary;

import java.util.List;

public interface LogService {
    Summary findSummaryByCourseId(Long courseId);

    Log saveOrUpdate(Log log);

    Summary saveOrUpdate(Summary summary);

    List<Summary> findPopularCourses();
}
