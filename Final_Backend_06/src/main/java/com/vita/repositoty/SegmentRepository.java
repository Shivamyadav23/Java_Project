package com.vita.repositoty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vita.model.Segment;

@Repository
public interface SegmentRepository extends JpaRepository<Segment, Integer> {

}
