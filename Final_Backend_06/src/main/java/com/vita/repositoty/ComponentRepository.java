package com.vita.repositoty;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vita.model.Component;


@Repository
public interface ComponentRepository extends JpaRepository<Component, Long> {
}
