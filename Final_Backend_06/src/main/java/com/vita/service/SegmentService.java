package com.vita.service;

import java.util.List;

import com.vita.model.Segment;

public interface SegmentService {
	public List<Segment> getAllSegments();

	public Segment getSegmentById(int id);
}
