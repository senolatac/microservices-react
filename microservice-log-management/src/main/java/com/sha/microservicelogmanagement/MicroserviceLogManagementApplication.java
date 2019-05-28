package com.sha.microservicelogmanagement;

import com.sha.microservicelogmanagement.config.CassandraConfig;
import com.sha.microservicelogmanagement.config.WebConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@EnableDiscoveryClient
@Import({WebConfig.class, CassandraConfig.class})
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class MicroserviceLogManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceLogManagementApplication.class, args);
	}

}
