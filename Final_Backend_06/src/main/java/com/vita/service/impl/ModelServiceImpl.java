package com.vita.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.Model;
import com.vita.repositoty.ModelRepository;
import com.vita.service.ModelService;

@Service
public class ModelServiceImpl implements ModelService {

    @Autowired
    private ModelRepository modelRepository;

    @Override
    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    @Override
    public List<Model> getAllModelsByManuIdAndSegId(long segId, long manuId) {
        return modelRepository.findByManufacturerIdAndSegmentId(segId, manuId);
    }

    @Override
    public Optional<Model> getModelById(long id) {
        return modelRepository.findByIdWithDetails(id);
    }
}
