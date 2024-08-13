package com.vita.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.model.Segment;
import com.vita.service.SegmentService;

@CrossOrigin
@RestController
@RequestMapping("/api/segments")
public class SegmentController {
	@Autowired
    private  SegmentService seg_service;

    /*
    public SegmentController(SegmentService segmentService) {
        this.segmentService = segmentService;
    }  
*/
    @GetMapping("/")
    public ResponseEntity<List<Segment>> getAllSegments() {
        try {
        	List<Segment> segments = seg_service.getAllSegments();
            return new ResponseEntity<>(segments, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		}
 /* 
    @GetMapping("/{id}")
    public ResponseEntity<Segment> getSegmentById(@PathVariable int id) {
    	Segment segment = seg_service.getSegmentById(id);
        if (segment != null) {
            return new ResponseEntity<>(segment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
   */
}